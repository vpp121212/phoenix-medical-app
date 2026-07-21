import 'package:flutter/material.dart';
import '../utils/theme.dart';

class NewsScreen extends StatefulWidget {
  const NewsScreen({super.key});

  @override
  State<NewsScreen> createState() => _NewsScreenState();
}

class _NewsScreenState extends State<NewsScreen> {
  final List<Map<String, dynamic>> _news = [
    {
      'title': 'افتتاح قسم جديد للعناية المركزة',
      'body': 'يسر مجمع فينكس الطبي الإعلان عن افتتاح قسم العناية المركزة الجديد بأحدث التجهيزات العالمية',
      'date': '20 يوليو 2026',
    },
    {
      'title': 'حملة التوعية بمرض السكري',
      'body': 'ينظم المجمع حملة توعوية شاملة للكشف المبكر عن مرض السكري طوال شهر أغسطس',
      'date': '15 يوليو 2026',
    },
    {
      'title': 'انضمام نخبة جديدة من الأطباء',
      'body': 'يسعدنا الإعلان عن انضمام نخبة من الأطباء الاستشاريين في تخصصات القلب والعظام والأطفال',
      'date': '10 يوليو 2026',
    },
    {
      'title': 'عروض الصيف للفحوصات الشاملة',
      'body': 'خصومات تصل إلى 30% على باقة الفحوصات الشاملة طوال فصل الصيف',
      'date': '5 يوليو 2026',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('الأخبار'),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: _news.length,
        itemBuilder: (context, index) {
          final item = _news[index];
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: InkWell(
              borderRadius: BorderRadius.circular(16),
              onTap: () {},
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: double.infinity,
                      height: 180,
                      decoration: BoxDecoration(
                        color: AppTheme.primaryColor.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(
                        Icons.medical_services,
                        size: 64,
                        color: AppTheme.primaryColor,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      item['title'],
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      item['body'],
                      style: const TextStyle(
                        color: AppTheme.textSecondary,
                        height: 1.5,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      item['date'],
                      style: const TextStyle(
                        fontSize: 12,
                        color: AppTheme.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
