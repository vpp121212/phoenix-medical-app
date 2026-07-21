import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../utils/theme.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user;

    return SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const SizedBox(height: 24),
            CircleAvatar(
              radius: 56,
              backgroundColor: AppTheme.primaryColor,
              child: Text(
                (user?.name ?? 'مستخدم').substring(0, 1),
                style: const TextStyle(
                  fontSize: 40,
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              user?.name ?? 'مستخدم',
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),
            if (user?.phone != null)
              Text(
                user!.phone!,
                style: const TextStyle(
                  fontSize: 16,
                  color: AppTheme.textSecondary,
                ),
              ),
            const SizedBox(height: 32),
            Card(
              child: Column(
                children: [
                  _ProfileMenuItem(
                    icon: Icons.person,
                    title: 'البيانات الشخصية',
                    onTap: () {},
                  ),
                  const Divider(height: 1),
                  _ProfileMenuItem(
                    icon: Icons.medical_services,
                    title: 'التقارير الطبية',
                    onTap: () {},
                  ),
                  const Divider(height: 1),
                  _ProfileMenuItem(
                    icon: Icons.receipt_long,
                    title: 'الفواتير',
                    onTap: () {},
                  ),
                  const Divider(height: 1),
                  _ProfileMenuItem(
                    icon: Icons.notifications,
                    title: 'الإشعارات',
                    onTap: () {},
                    trailing: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 2,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.red,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Text(
                        '3',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Card(
              child: Column(
                children: [
                  _ProfileMenuItem(
                    icon: Icons.info_outline,
                    title: 'عن التطبيق',
                    onTap: () {},
                  ),
                  const Divider(height: 1),
                  _ProfileMenuItem(
                    icon: Icons.privacy_tip_outlined,
                    title: 'سياسة الخصوصية',
                    onTap: () {},
                  ),
                  const Divider(height: 1),
                  _ProfileMenuItem(
                    icon: Icons.help_outline,
                    title: 'مساعدة',
                    onTap: () {},
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Card(
              child: _ProfileMenuItem(
                icon: Icons.language,
                title: 'English',
                onTap: () {},
                trailing: const Text(
                  'العربية',
                  style: TextStyle(color: AppTheme.textSecondary),
                ),
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: ElevatedButton.icon(
                onPressed: () {
                  context.read<AuthProvider>().logout();
                  Navigator.of(context).pushReplacementNamed('/login');
                },
                icon: const Icon(Icons.logout),
                label: const Text('تسجيل الخروج'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red,
                ),
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}

class _ProfileMenuItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final VoidCallback onTap;
  final Widget? trailing;

  const _ProfileMenuItem({
    required this.icon,
    required this.title,
    required this.onTap,
    this.trailing,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: AppTheme.primaryColor),
      title: Text(title),
      trailing: trailing ?? const Icon(Icons.chevron_left),
      onTap: onTap,
    );
  }
}
