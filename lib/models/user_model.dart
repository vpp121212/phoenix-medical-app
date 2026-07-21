class UserModel {
  final String? id;
  final String? name;
  final String? phone;
  final String? email;
  final String? profilePic;

  UserModel({
    this.id,
    this.name,
    this.phone,
    this.email,
    this.profilePic,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      name: json['name'],
      phone: json['phone'],
      email: json['email'],
      profilePic: json['profile_pic'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'phone': phone,
      'email': email,
      'profile_pic': profilePic,
    };
  }
}
