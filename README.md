# Quiz Sınav Uygulaması

Bu proje, bir **quiz sınavı uygulamasının** geliştirilmesini amaçlamaktadır. Projede backend, frontend ve diğer dosyalar modüler bir yapıda yer almaktadır.

## İçerik

### Klasörler ve Dosyalar
- **northwind/**  
  Quiz sınav uygulamasının **backend** kısmını içerir. Bu kısım Java ile geliştirilmiş olup, veritabanı olarak PostgreSQL kullanılmaktadır.
  
- **quiztest/**  
  Projeye ait diğer test dosyaları ve yardımcı araçlar.

- **.gitignore**  
  Git tarafından izlenmesi gerekmeyen dosyaları tanımlar.

- **MIT license**  
  Projenin lisansını belirtir. Bu proje MIT lisansı ile yayınlanmıştır.

## Backend: Northwind Klasörü
Backend kısmı, aşağıdaki özellikleri barındırır:
1. **RESTful API**: Quiz sınavı için temel CRUD işlemleri.
2. **Veritabanı Yönetimi**: PostgreSQL kullanılarak sınav, sorular ve kullanıcı verileri yönetilir.
3. **Java Frameworkleri**: Spring Boot kullanılarak yapılandırılmıştır.

### Kurulum
1. Gerekli bağımlılıkları yükleyin (ör. Maven veya Gradle ile).
2. PostgreSQL veritabanını yapılandırın.
3. Aşağıdaki komutla uygulamayı çalıştırın:
   ```bash
  
