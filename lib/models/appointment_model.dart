class AppointmentModel {
  final String? id;
  final String? userId;
  final String? doctorId;
  final String? doctorName;
  final String? doctorSpecialization;
  final String? doctorImage;
  final DateTime? date;
  final String? time;
  final String? status;
  final String? notes;

  AppointmentModel({
    this.id,
    this.userId,
    this.doctorId,
    this.doctorName,
    this.doctorSpecialization,
    this.doctorImage,
    this.date,
    this.time,
    this.status,
    this.notes,
  });

  factory AppointmentModel.fromJson(Map<String, dynamic> json) {
    return AppointmentModel(
      id: json['id'],
      userId: json['user_id'],
      doctorId: json['doctor_id'],
      doctorName: json['doctor_name'],
      doctorSpecialization: json['doctor_specialization'],
      doctorImage: json['doctor_image'],
      date: json['date'] != null ? DateTime.parse(json['date']) : null,
      time: json['time'],
      status: json['status'] ?? 'pending',
      notes: json['notes'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'doctor_id': doctorId,
      'doctor_name': doctorName,
      'doctor_specialization': doctorSpecialization,
      'doctor_image': doctorImage,
      'date': date?.toIso8601String(),
      'time': time,
      'status': status,
      'notes': notes,
    };
  }

  String get statusText {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'confirmed':
        return 'مؤكد';
      case 'completed':
        return 'مكتمل';
      case 'cancelled':
        return 'ملغي';
      default:
        return status ?? '';
    }
  }

  Color get statusColor {
    switch (status) {
      case 'pending':
        return const Color(0xFFFFA000);
      case 'confirmed':
        return const Color(0xFF2E7D32);
      case 'completed':
        return const Color(0xFF1565C0);
      case 'cancelled':
        return const Color(0xFFD32F2F);
      default:
        return Colors.grey;
    }
  }
}
