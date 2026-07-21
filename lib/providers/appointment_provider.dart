import 'package:flutter/foundation.dart';
import '../models/appointment_model.dart';
import '../services/api_service.dart';

class AppointmentProvider extends ChangeNotifier {
  final ApiService _api = ApiService();

  List<AppointmentModel> _appointments = [];
  bool _isLoading = false;
  String? _error;
  String? _successMessage;

  List<AppointmentModel> get appointments => _appointments;
  bool get isLoading => _isLoading;
  String? get error => _error;
  String? get successMessage => _successMessage;

  List<AppointmentModel> get upcomingAppointments {
    return _appointments
        .where((a) => a.status == 'pending' || a.status == 'confirmed')
        .toList();
  }

  List<AppointmentModel> get pastAppointments {
    return _appointments
        .where((a) => a.status == 'completed' || a.status == 'cancelled')
        .toList();
  }

  Future<void> loadAppointments() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _api.get('/appointments');
      final list = response['appointments'] as List<dynamic>;
      _appointments = list
          .map((e) => AppointmentModel.fromJson(e as Map<String, dynamic>))
          .toList();
    } catch (e) {
      _error = e.toString();
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<bool> bookAppointment(Map<String, dynamic> data) async {
    _isLoading = true;
    _error = null;
    _successMessage = null;
    notifyListeners();

    try {
      await _api.post('/appointments', data);
      _successMessage = 'تم حجز الموعد بنجاح';
      await loadAppointments();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> cancelAppointment(String id) async {
    try {
      await _api.delete('/appointments/$id');
      _successMessage = 'تم إلغاء الموعد';
      await loadAppointments();
      return true;
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return false;
    }
  }

  void clearMessages() {
    _error = null;
    _successMessage = null;
    notifyListeners();
  }
}
