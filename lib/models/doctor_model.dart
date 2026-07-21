class DoctorModel {
  final String? id;
  final String? name;
  final String? specialization;
  final String? bio;
  final double rating;
  final int reviewCount;
  final String? imageUrl;
  final List<String> availableDays;
  final List<String> availableTimes;
  final double consultationFee;
  final bool isAvailable;

  DoctorModel({
    this.id,
    this.name,
    this.specialization,
    this.bio,
    this.rating = 0.0,
    this.reviewCount = 0,
    this.imageUrl,
    this.availableDays = const [],
    this.availableTimes = const [],
    this.consultationFee = 0.0,
    this.isAvailable = true,
  });

  factory DoctorModel.fromJson(Map<String, dynamic> json) {
    return DoctorModel(
      id: json['id'],
      name: json['name'],
      specialization: json['specialization'],
      bio: json['bio'],
      rating: (json['rating'] ?? 0.0).toDouble(),
      reviewCount: json['review_count'] ?? 0,
      imageUrl: json['image_url'],
      availableDays: List<String>.from(json['available_days'] ?? []),
      availableTimes: List<String>.from(json['available_times'] ?? []),
      consultationFee: (json['consultation_fee'] ?? 0.0).toDouble(),
      isAvailable: json['is_available'] ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'specialization': specialization,
      'bio': bio,
      'rating': rating,
      'review_count': reviewCount,
      'image_url': imageUrl,
      'available_days': availableDays,
      'available_times': availableTimes,
      'consultation_fee': consultationFee,
      'is_available': isAvailable,
    };
  }
}
