class NewsModel {
  final String? id;
  final String? title;
  final String? body;
  final String? imageUrl;
  final DateTime? createdAt;

  NewsModel({
    this.id,
    this.title,
    this.body,
    this.imageUrl,
    this.createdAt,
  });

  factory NewsModel.fromJson(Map<String, dynamic> json) {
    return NewsModel(
      id: json['id'],
      title: json['title'],
      body: json['body'],
      imageUrl: json['image_url'],
      createdAt: json['created_at'] != null
          ? DateTime.parse(json['created_at'])
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'body': body,
      'image_url': imageUrl,
      'created_at': createdAt?.toIso8601String(),
    };
  }
}
