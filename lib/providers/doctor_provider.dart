import 'package:flutter/foundation.dart';
import '../models/doctor_model.dart';
import '../services/api_service.dart';

class DoctorProvider extends ChangeNotifier {
  final ApiService _api = ApiService();

  List<DoctorModel> _doctors = [];
  List<DoctorModel> _filteredDoctors = [];
  DoctorModel? _selectedDoctor;
  bool _isLoading = false;
  String? _error;
  String _searchQuery = '';
  String _selectedSpecialization = 'الكل';

  List<DoctorModel> get doctors => _filteredDoctors;
  List<DoctorModel> get allDoctors => _doctors;
  DoctorModel? get selectedDoctor => _selectedDoctor;
  bool get isLoading => _isLoading;
  String? get error => _error;
  String get searchQuery => _searchQuery;
  String get selectedSpecialization => _selectedSpecialization;

  List<String> get specializations {
    final specs = _doctors.map((d) => d.specialization ?? '').toSet().toList();
    specs.sort();
    return ['الكل', ...specs];
  }

  Future<void> loadDoctors() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _api.get('/doctors');
      final list = response['doctors'] as List<dynamic>;
      _doctors = list
          .map((e) => DoctorModel.fromJson(e as Map<String, dynamic>))
          .toList();
      _applyFilters();
    } catch (e) {
      _error = e.toString();
    }

    _isLoading = false;
    notifyListeners();
  }

  void setSelectedDoctor(DoctorModel doctor) {
    _selectedDoctor = doctor;
    notifyListeners();
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    _applyFilters();
  }

  void setSpecialization(String specialization) {
    _selectedSpecialization = specialization;
    _applyFilters();
  }

  void _applyFilters() {
    _filteredDoctors = _doctors.where((doctor) {
      final matchesSearch = _searchQuery.isEmpty ||
          (doctor.name?.contains(_searchQuery) ?? false) ||
          (doctor.specialization?.contains(_searchQuery) ?? false);
      final matchesSpecialization = _selectedSpecialization == 'الكل' ||
          doctor.specialization == _selectedSpecialization;
      return matchesSearch && matchesSpecialization;
    }).toList();
    notifyListeners();
  }
}
