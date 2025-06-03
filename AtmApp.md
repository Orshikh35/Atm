# ATM App

## 

##


## ASP.NET Core Web API


---

## ✅ Системийн Шаардлагууд (Requirements)

### 1. Хэрэглэгч
- **Admin**
  - Хэрэглэгч
    - Хэрэглэгчийн мэдээлэл харах
    - Хэрэглэгч бүртгэх
    - Хэрэглэгчдийн мэдээлэл харах, засах
      ```
      Хэрэглэгчдийн мэдээлэл агуулагдах зүйлс:
        Хэрэглэгчийн нэр
        Эрхийн түвшин
        Нэвтрэх нэр
        Холбогдох утасны дугаар
      ```
  - АТМ 
    - АТМ - уудын мэдээлэл харах, засах
    - Шинэ АТМ бүртгэх
  - Засвар үйлчилгээ
    - Асуудалтай АТМ - уудын жагсаалт харах
      ```
      ```
    - АТМ - ны засвар үйлчилгээний хүсэлт илгээх
      ```
      ```
  
- **Engineer**
  - АТМ - уудын мэдээлэл харах, засах
    ```
    ```
  - Засвар үйлчилгээ
    - Асуудалтай АТМ - уудын жагсаалт харах
      ```
      ```
    - АТМ - ны засвар үйлчилгээний хүсэлтэд хариулах
      ```
      ```



### 2. ATM


### 3. АТМ дээр үүссэн асуудлууд




1. Бүртгэлтэй нийт АТМ-уудын мэдээлэл харах
```
//жишээ
  АТМ-ны ID
  АТМ нэр: CDM300,
  АТМ загвар: P5800L, // or H68N
  АТМ IP хаяг: 192.168.0.2,
  АТМ Port: 9999,
  АТМ суурилуулсан өдөр: 2024:05:21,
  АТМ суурилуулсан аймгийн нэр: Хөвсгөл, // Улаанбаатар эсвэл бусад аймгийн нэр
  АТМ сериал дугаар: 123456,
  АТМ байршил: Их дэлгүүр,
  АТМ-ны байгууллагын нэр: Голомт банк,
  АТМ-ны баталгаат хугацаа дуусах огноо: 2026:05:21,
  АТМ-ны мастер дугаар: 5681212
```


| АТМ-ны ID | АТМ нэр | АТМ загвар | АТМ IP хаяг | АТМ Port | АТМ суурилуулсан өдөр | АТМ суурилуулсан аймгийн нэр | АТМ сериал дугаар | АТМ байршил | АТМ-ны байгууллагын нэр | АТМ-ны баталгаат хугацаа дуусах огноо | АТМ-ны мастер дугаар |
|-----------|---------|-------------|--------------|----------|--------------------------|-------------------------------|--------------------|--------------|-----------------------------|-----------------------------------------|------------------------|
|     1     | CDM300  | P5800L      | 192.168.0.2  | 9999     | 2024:05:21               | Хөвсгөл                       | 123456             | Их дэлгүүр   | Голомт банк                 | 2026:05:21                              | 5681212               |



3. Сэлбэгийн бүртгэл харах
```
  Сэлбэгийн ID:
  Сэлбэгийн нэр:
  Сэлбэгийн парт дугаар:
  Сэлбэгийн сериал дугаар:
  Анхны сэлбэгийн тоо:
  Ашиглагдсан сэлбэгийн тоо:
  Үлдсэн сэлбэгийн тоо:
```

| Сэлбэгийн ID | Сэлбэгийн нэр | Сэлбэгийн парт дугаар | Сэлбэгийн сериал дугаар | Анхны сэлбэгийн тоо | Ашиглагдсан сэлбэгийн тоо | Үлдсэн сэлбэгийн тоо |
| -- | -- | -- | -- | -- | -- | -- |
| -- | -- | -- | -- | -- | -- | -- |



5. Тайлан гаргах

  Заагдсан хугацааны дагуу нийт засвар үйлчилгээ хийгдсэн АТМ-уудын дэлгэрэнгүй тайлбаруудыг гаргана. Хэрхэн зассан, хэн хэн зассан, засвар эхэлсэн хугацаа, дууссан хугацаа, гэх мэт



6. 


## 📈 Бизнес модель

1. Үйлчилгээний зорилго

    Банкны АТМ төхөөрөмжүүдийн:

    Засвар үйлчилгээ

    Төхөөрөмжүүдийн бүртгэл, сэлбэг хяналт

    Ажлын тайлан


2. Зорилтот хэрэглэгчид

  🏦 Банк, санхүүгийн байгууллага

  🛠️ Техник үйлчилгээ үзүүлэгч компани	

  🧑‍💻 Систем админ -	Хяналт, тайлан, мэдээлэл


3. Орлогын эх үүсвэр

4. Зардал
  - Систем хөгжүүлэлт
    - Сервер

--- 
## 🗃️ Дата модель (Entity Relationship Model)

✅ Үндсэн Entity-үүд

- **Models/AtmInfo**  

```csharp
namespace AtmApp.Models.ATMsInfo
{
    public class ATMsInfo
    {
        public int atm_id { get; set; } // АТМ-ны ID
        public string? atm_name { get; set; } // АТМ-ны нэр
        public string? atm_model { get; set; } // АТМ-ны загвар
        public string? atm_IP { get; set; } // АТМ-ны IP хаяг
        public int atm_port { get; set; } // АТМ-ны порт дугаар
        public DateTime atm_installationDate { get; set; } // АТМ суурилуулсан огноо
        public string? atm_orgName { get; set; } // АТМ-ны байгууллагын нэр
        public string? atm_location { get; set; } // АТМ-ны байршил
        public string? atm_serialNumber { get; set; } // АТМ-ны сериал дугаар
        public DateTime? atm_expiredDate { get; set; } // АТМ-ны баталгаат хугацаа дуусах огноо
        public string? atm_province { get; set; } // АТМ суурилуулсан аймгийн нэр
        public string? atm_masterKey { get; set; } // АТМ-ны мастер дугаар

        public List<MaintenanceRequest>? MaintenanceRequests { get; set; } // 
    }
}
```

- **Models/UserInfo**  
```csharp
namespace AtmApp.Models.UsersInfo
{
    public class UsersInfo
    {
        public int user_id { get; set; } // хэрэглэгчийн ID
        public string? user_username { get; set; } // хэрэглэгчийн нэвтрэх нэр
        public string? user_fullname { get; set; } // хэрэглэгчийн бүтэн нэр
        public DateTime user_createdAt { get; set; } // хэрэглэгч бүртгэгдсэн огноо
        public string? user_password { get; set; } // хэрэглэгчийн нууц үг
        public string? user_role { get; set; } // хэрэглэгчийн үүрэг [ engineer, operator, ]
        public string? user_orgName { get; set; } // хэрэглэгчийн байгууллагын нэр
        public string? user_workLocation { get; set; } // хэрэглэгчийн албан тушаал
        public string? user_status { get; set; } // active
        public int user_phoneNumber { get; set; } // хэрэглэгчтэй холбогдох дугаар

        public List<MaintenanceRequest>? CreatedRequests { get; set; }
        public List<MaintenanceRecord>? MaintenanceRecords { get; set; }
    }
}
```

- **Models/SparePartsInfo**  
```csharp
namespace AtmApp.Models.SparePartsInfo
{
    public class SparePartsInfo
    {
        public int sparePart_id { get; set; } // Сэлбэгийн ID
        public string? sparePart_name { get; set; } // Сэлбэгийн нэр
        public string? sparePart_partNumber { get; set; } // Сэлбэгийн парт дугаар
        public string? sparePart_serialNumber { get; set; } // Сэлбэгийн сериал дугаар
        public int sparePart_initialQuantity { get; set; } // Анхны сэлбэгийн тоо
        public int sparePart_usedQuantity { get; set; } // Ашиглагдсан сэлбэгийн тоо
        public int sparePart_stockInQuantity { get; set; } // Үлдсэн сэлбэгийн тоо

        public List<MaintenanceUsedSparePart>? UsedInMaintenance { get; set; }
    }
}
```


- **Models/MaintenanceRequest**  
```csharp
using AtmApp.Models.ATMsInfo;
using AtmApp.Models.UsersInfo;

namespace AtmApp.Models.MaintenanceRequest
{
    public class MaintenanceRequest
    {
        public int maintenanceRequest_id { get; set; }
        public DateTime maintenanceRequest_createdAt { get; set; }

        public int CreatedBy_user_id { get; set; }
        public UsersInfo? CreatedBy { get; set; }

        public int atm_id { get; set; }
        public ATMsInfo? ATM { get; set; }

        public string? maintenanceRequest_description { get; set; }
        public string? maintenanceRequest_status { get; set; } // default "New"
        public string? maintenance_type { get; set; } // Planned Maintenance , Hardware, Software, Firmware, OS, etc...

        public List<MaintenanceRecord>? Records { get; set; }
    }
}
```

- **Models/MaintenanceRecord**  
```csharp
using AtmApp.Models.UsersInfo;
using AtmApp.Models.MaintenanceRequest;

namespace AtmApp.Models.MaintenanceRecord
{
    public class MaintenanceRecord
    {
        public int maintenanceRecord_id { get; set; } // Асуудлын бүртгэлийн ID

        public int maintenanceRequest_id { get; set; } // Асуудлын хүсэлтийн ID
        public MaintenanceRequest.MaintenanceRequest? MaintenanceRequest { get; set; }

        public int maintenancedBy_user_id { get; set; } // Асуудлыг үүсгэсэн хэрэглэгчийн ID
        public UsersInfo? MaintenancedBy { get; set; }

        public DateTime maintenance_startedAt { get; set; } // Асуудлыг шалгаж эхэлсэн огноо
        public string? maintenanced_diagnosis { get; set; } // Асуудлыг оношлосон тайлбар
        public string? maintenanced_explanation { get; set; } // Асуудлыг хэрхэн шийдвэрлэсэн тайлбар
        public DateTime maintenance_finishedAt { get; set; } // Асуудлыг шалгаж дууссан огноо

        public List<MaintenanceUsedSparePart>? UsedSpareParts { get; set; }
    }
}
```

- **Models/MaintenanceUsedSparePart**  
```csharp
using AtmApp.Models.MaintenanceRecord;
using AtmApp.Models.SparePartsInfo;

namespace AtmApp.Models.MaintenanceUsedSparePart
{
    public class MaintenanceUsedSparePart
    {
        public int maintenanceUsedSparePart_id { get; set; } // 

        public int maintenanceRecord_id { get; set; } // 
        public MaintenanceRecord? MaintenanceRecord { get; set; }

        public int sparePart_id { get; set; }
        public SparePartsInfo? SparePart { get; set; }

        public int quantity { get; set; }
    }
}
```


📊 Өгөгдөл харуулах боломжтой дэлгэцүүд

АТМ жагсаалт харах  // Голомт банкны Улаанбаатар дахь АТМ-уудын хувьд 
```
  SELECT * FROM kkkk.atm;
  where province = "Улаанбаатар" and bank_name = "Голомт банк";

  орон нутгийн АТМ-уудын хувьд 
  SELECT * FROM kkkk.atm
  where province != "Улаанбаатар" and bank_name = "Голомт банк";
```


| id | АТМ Нэр   | Загвар  | ip_address      | port | installation_date | province    | serial_number | bank_name  | location      |
|----|--------|--------|------------------|------|-------------------|-------------|----------------|-----------|------------|
| 1  | CDM300 | P5800L | 192.168.0.2      | 9999 | 2024-05-21        | Хөвсгөл     | 123456         | Голомт банк | *(null)*      |
| 3  | CDM241 | P5800L | 192.168.187.17   | 9122 | 2022-06-22        | Улаанбаатар | 561962         | Голомт банк | Сансар тунель |
| 4  | CDM244 | P5800L | 192.168.196.209  | 9244 | 2022-07-06        | Улаанбаатар | 561951         | Голомт банк | Аман хуур БСБ |
| 5  | CDM294 | P5800L | 192.168.191.33   | 9464 | 2023-10-05        | Улаанбаатар | 622854         |  Голомт банк | Яармаг Босса  |


Хэрэглэгчдийн мэдээлэл харах
| Овог | Нэр | Байгууллагын нэр | Албан тушаал | Нэвтрэх нэр | Нууц үг | Эрхийн түвшин |
| -- | -- | -- | -- | -- | -- | -- |
| Ариунжаргал | Эрдэнэбат | Нью Компас ХХК | инженер | erdenebat_a | 12345678 | Админ |
| K | KK | Голомт банк | инженер | kk_k | 12345678 | Инженер |


Засвар бүртгэлийн тайлан
| АТМ нэр | Байршил | Байгууллагын нэр | Дуудлагын төрөл | Дуудлагын огноо | Дуудлагын тайлбар | Дуудлага өгсөн мэргэжилтэн |  Албан тушаал | Нэр | Дуудлага хүлээн авсан мэргэжилтэн |  Албан тушаал | Нэр | Ангилал | Шалгасан эхэлсэн огноо | Шалгасан мэргэжилтэн | Албан тушаал | Нэр | Шалгаж тодорхойлсон асуудлын тайлбар | Асуудлыг шийдвэрлэсэн эсэх | Асуудал шийдэгдэж дууссан огноо | Асуудлыг хэрхэн шийдвэрлэсэн нэмэлт тайлбар | Ашиглагдсан сэлбэгийн нэр | Парт дугаар |
| -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
| CDM215 | Содон | Голомт банк | Утас | 2025-03-27 | Орлого зарлага дээр алдаа гарсан |  |


```
Дуудлагын төрөл
  Утас, 
  мэйл, 
  Other
```

Repair description

Сэлбэгийн бүртгэл харах

| Сэлбэгийн нэр |  Парт дугаар  | Сериал дугаар  | Нийт худалдан авсан тоо | Агуулахад үлдсэн тоо | Ашигласан | төрөл | |
|----|--------|--------|------------------|------|----------|--|---|
| Printer board | 301011647 | | 2 | 1 | 1 | шинэ | **Ашигласан сэлбэгийн дэлгэрэнгүй мэдээлэл харах** |

  **Ашигласан сэлбэгийн дэлгэрэнгүй мэдээлэл харах**
| Сэлбэгийн нэр | Ашиглагдсан сэлбэгийн тоо| Ашиглагдсан огноо | Ашиглагдсан газар | Ашигласан хүний нэр | Төрөл |
|----|--------|--------|------------------|---|---|
| Printer board | 1 | 2025:12:12 | CDM333 | Эрдэнэбат | Зарсан |
| Printer board | 1 | 2025:05:21 | CDM222 | KKKK | Баталгаат хугацаанд сольсон |



Техникч бүрийн гүйцэтгэл


АТМ дээр гарсан алдааны хяналт


---

# Docker

