# FBV.ONE — Design System

> Hệ thống thiết kế đúc kết từ bộ giao diện mobile (splash, đăng nhập, xác thực, danh sách tin nhắn, khung chat) của ứng dụng nhắn tin **FBV.ONE**.
> Phong cách: hiện đại, tối giản (clean minimal), nền trắng, điểm nhấn xanh dương tươi (bright blue), header dùng gradient xanh, logo DNA nhiều màu.

---

## 1. Brand

**Tên thương hiệu:** FBV.ONE
**Loại sản phẩm:** Ứng dụng nhắn tin / mạng xã hội (messaging app, phong cách tương tự Zalo)

**Logo:** Biểu tượng chuỗi xoắn DNA bao quanh một quả cầu mặt trời (hình tròn vàng/cam) ở trung tâm, viền bởi các vòng gradient cầu vồng.

**Wordmark — 2 biến thể:**
- **Splash:** "FBV.ONE" (có dấu chấm) chữ in đậm màu **tím** `--brand-purple`, có hiệu ứng glow, trên nền navy.
- **Onboarding / Welcome:** "FBV ONE" (không dấu chấm) chữ in đậm màu **xanh primary** `--primary`, trên nền trắng.

**Tính cách thương hiệu (brand personality):** Năng động, công nghệ, kết nối, thân thiện, đáng tin cậy.

---

## 2. Color Palette (Bảng màu)

### 2.1 Brand Colors — Màu logo

| Token | Hex | Mô tả |
|---|---|---|
| `--brand-purple` | `#7B2FF7` | Tím wordmark "FBV.ONE", có glow |
| `--brand-gold` | `#F5A623` | Vàng/cam quả cầu trung tâm logo |
| `--brand-cyan` | `#1FB6D6` | Xanh cyan dải xoắn DNA |
| `--brand-teal` | `#16A085` | Xanh ngọc dải xoắn DNA |
| `--brand-rainbow` | gradient | Vòng cầu vồng (cyan → green → gold → orange → purple) |

Gradient logo tham khảo:
```css
background: linear-gradient(135deg, #1FB6D6 0%, #16A085 25%, #F5A623 60%, #7B2FF7 100%);
```

### 2.2 Primary — Màu chủ đạo (xanh dương)

| Token | Hex | Dùng cho |
|---|---|---|
| `--primary` | `#1877F2` | Màu xanh chính: tiêu đề, link, tab active, CTA đậm |
| `--primary-strong` | `#0A66FF` | Nút nhấn mạnh ("Trở về đăng nhập") |
| `--primary-soft` | `#90C2F9` | Nút CTA chính trạng thái nhạt ("Tiếp theo", "Đăng nhập", "Xác nhận") |
| `--primary-link` | `#1A73E8` | Link văn bản ("Quên mật khẩu?") |

### 2.3 Header Gradient — Gradient thanh đầu trang

Thanh header (danh sách tin nhắn, khung chat) dùng gradient ngang từ xanh đậm bên trái sang xanh sáng bên phải.

```css
--header-gradient: linear-gradient(90deg, #1565E0 0%, #2E8BF0 50%, #4FA8F5 100%);
```

### 2.4 Neutrals — Màu trung tính

| Token | Hex | Dùng cho |
|---|---|---|
| `--bg-splash` | `#0E2745` | Nền navy đậm màn splash |
| `--bg-base` | `#FFFFFF` | Nền chính các màn hình |
| `--bg-subtle` | `#F7F8FA` | Nền nhạt (màn xác thực) |
| `--bg-chat` | `#ECEFF1` | Nền khung chat |
| `--surface-field` | `#F2F3F5` | Nền ô input, nút phụ |
| `--border` | `#E3E5E8` | Viền ô input, divider |
| `--text-primary` | `#1C1C1E` | Chữ chính |
| `--text-secondary` | `#8E8E93` | Chữ phụ, placeholder, timestamp |
| `--text-on-primary` | `#FFFFFF` | Chữ trên nền xanh |

### 2.5 Semantic / Bubble

| Token | Hex | Dùng cho |
|---|---|---|
| `--bubble-sent` | `#D6EAFB` | Bong bóng tin nhắn đã gửi (xanh nhạt) |
| `--bubble-received` | `#FFFFFF` | Bong bóng tin nhắn nhận |
| `--success` | `#34C759` | Trạng thái online, icon pin |

### 2.6 Badge & Illustration — Màu phụ trợ

Dùng cho icon badge (màn Điều khoản), minh họa onboarding, banner.

| Hex | Dùng cho |
|---|---|
| `#E3EEFD` | Nền tint badge xanh (icon mục điều khoản) |
| `#FDE3E3` | Nền tint badge đỏ (cảnh báo / cấm) |
| `#E5484D` | Icon/đường viền cảnh báo (đỏ) |
| `#3A4658` | Màu nền minh họa tối (illustration onboarding) |
| `#4B5870` | Màu phụ minh họa (avatar phụ) |
| gradient `#7FB5D6 → #2E6F9E` | Banner "cộng đồng an toàn" cuối màn Điều khoản |
| gradient `#1565E0 → #0A66FF` (dọc) | Rail điều hướng desktop |
| `#DBEBFF` / viền `#CFE3FB` | Bóng chat gửi ở bản desktop |
| `#E8F1FE` | Nền item active (danh sách hội thoại/menu desktop) |

---

## 3. Typography (Kiểu chữ)

Sử dụng font hệ thống (San Francisco trên iOS), không serif.

```css
font-family: -apple-system, "SF Pro Text", "Segoe UI", Roboto, system-ui, sans-serif;
```

| Style | Size | Weight | Color | Dùng cho |
|---|---|---|---|---|
| Title / H1 | 26–28px | 700 Bold | `--primary` | Tiêu đề màn hình ("Nhập tài khoản đăng nhập", "Nhập mật khẩu") |
| Header bar | 18px | 700 Bold | `--text-on-primary` | Tên người dùng trên header chat |
| Body | 16–17px | 400 Regular | `--text-primary` | Nội dung chính, mô tả |
| Tab label (active) | 16px | 600 SemiBold | `--primary` | Tab đang chọn ("Email", "Điện thoại") |
| Tab label (inactive) | 16px | 400 Regular | `--text-secondary` | Tab chưa chọn |
| Button | 16–17px | 600 SemiBold | trắng / `--text-primary` | Nhãn nút |
| Caption | 13–14px | 400 Regular | `--text-secondary` | Timestamp, ghi chú ("Gửi lại mã (118s)") |
| Placeholder | 16px | 400 Regular | `--text-secondary` | Gợi ý trong ô nhập |

---

## 4. Spacing & Layout

Hệ thống khoảng cách cơ sở **4px** (scale 4 / 8 / 12 / 16 / 20 / 24 / 32).

| Token | Giá trị |
|---|---|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--screen-padding` | 20px (lề trái/phải nội dung) |
| `--field-height` | 56px (chiều cao input & nút) |

Bố cục: căn giữa theo chiều ngang, nội dung chính cách lề màn hình 20px, các phần tử xếp dọc với khoảng cách 16–24px.

---

## 5. Border Radius (Bo góc)

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--radius-input` | 12px | Ô input, nút phụ |
| `--radius-button` | 28px (pill / nửa chiều cao) | **Tất cả nút** (Primary, Secondary, Social): "Tiếp theo", "Tạo tài khoản mới", "Đăng nhập", "Xác nhận"… |
| `--radius-bubble` | 16px | Bong bóng tin nhắn |
| `--radius-avatar` | 50% | Avatar tròn |
| `--radius-otp` | 12px | Ô nhập mã OTP |

---

## 6. Components (Thành phần)

### 6.1 Buttons

**Primary CTA (pill, nền nhạt)** — dùng nhiều nhất trong luồng đăng nhập.
```css
height: 56px;
background: var(--primary-soft);   /* #90C2F9 */
color: #FFFFFF;
border-radius: 28px;
font-weight: 600;
border: none;
```

**Primary Strong (pill, nền đậm)** — hành động nhấn mạnh.
```css
background: var(--primary-strong); /* #0A66FF */
color: #FFFFFF;
border-radius: 28px;
```

**Secondary (outline / surface)** — "Tạo tài khoản mới".
```css
background: var(--surface-field);  /* #F2F3F5 */
color: var(--text-primary);
border: 1px solid var(--border);
border-radius: 28px;               /* pill — đồng bộ với Primary CTA */
```
> Quy ước: mọi nút hành động (Primary, Primary Strong, Secondary, Social) dùng bo góc pill `--radius-button` (28px). `--radius-input` (12px) chỉ dùng cho ô input và ô OTP.

**Social button** — "Tiếp tục với Google / Apple".
```css
background: #FFFFFF;
border: 1px solid var(--border);
border-radius: 28px;
/* icon trái + nhãn căn giữa */
```

**Trạng thái Disabled** — áp dụng cho mọi `.btn`.
```css
.btn:disabled{ opacity:.5; cursor:not-allowed; }
```
> Dùng khi điều kiện chưa thỏa (vd. nút "Tiếp theo" ở màn đăng ký chỉ bật khi đã nhập email/SĐT **và** tích checkbox điều khoản).

### 6.2 Text Input
```css
height: 56px;
background: var(--surface-field);
border: 1px solid var(--border);
border-radius: 12px;
padding: 0 16px;
color: var(--text-primary);
/* placeholder: var(--text-secondary) */
```
Biến thể: input có prefix country code (`+84 ▾`), input password có icon mắt (toggle hiện/ẩn) bên phải.

**Ghi chú dưới input (`.field-hint`):** chữ 14px `--text-secondary`, cách input 8px. Dùng cho mô tả ràng buộc (vd. "Mật khẩu phải lớn hơn 8 ký tự và nhỏ hơn 30 ký tự").

### 6.3 Tabs (segmented)
Hai tab ngang ("Email" / "Điện thoại"). Tab active: chữ `--primary` + gạch chân `--primary` 2px. Tab inactive: chữ `--text-secondary`, không gạch chân.

### 6.4 OTP Input
6 ô riêng biệt chia đều một hàng (`flex:1; min-width:0` để không tràn card), mỗi ô cao 60px (≤380px: 52px), bo góc 12px, viền `--border`; ô đang focus có viền `--primary`. Hỗ trợ tự nhảy ô khi gõ, lùi ô khi xóa, và dán mã tự điền 6 ô.

### 6.4b Checkbox điều khoản (`.terms`)
Ô vuông 22px bo góc 6px, viền `--border`; khi tích: nền `--primary` + dấu check trắng. Kèm nhãn nhiều dòng, link điều khoản màu `--primary-link`.

### 6.5 Header Bar
Nền `--header-gradient`, chữ trắng. Có thể chứa: nút back (‹), tiêu đề + trạng thái phụ ("Ngoại tuyến"), ô tìm kiếm, icon QR/quét, nút "+", icon gọi thoại/video, avatar.

### 6.6 List Item (danh sách hội thoại)
Avatar tròn 48–52px bên trái + tên (16px, `--text-primary`) + dòng preview (14px, `--text-secondary`) + timestamp góc phải trên (13px, `--text-secondary`). Divider mảnh `--border` giữa các item.

### 6.7 Message Bubble
- Đã gửi (`.bubble.sent`): nền `--bubble-sent` (#D6EAFB), `align-self:flex-end` (co theo nội dung, căn phải).
- Đã nhận (`.bubble.received`): nền trắng + viền `--border`, `align-self:flex-start` (căn trái).
- Nội dung tin gói trong `.msg-text`; giờ trong `.time`; nhãn ngày ("Hôm nay") căn giữa, chữ `--text-secondary`.
- **Quan trọng:** dùng `align-self` thay vì `margin:auto` để bóng chat không bị flex kéo giãn full chiều rộng.

### 6.8 Bottom Tab Bar
4 tab: **Tin nhắn / Danh bạ / Bản tin / Cá nhân**. Icon + nhãn. Tab active màu `--primary`, tab inactive `--text-secondary`. Nền trắng, viền trên `--border`.

### 6.9 Onboarding Carousel (màn Welcome)
- Wordmark "FBV ONE" xanh primary trên cùng.
- **Illustration:** vòng tròn nền `#3A4658` (220px) chứa icon chủ đề; có thể kèm 2 avatar phụ hai bên.
- **Dots indicator:** chấm 9px, inactive `#1C1C1E` opacity .25; active màu `--primary`, kéo dài thành thanh bo tròn (22px).
- Hỗ trợ tự chạy, bấm chấm chuyển slide, và vuốt trái/phải trên mobile.
- Cuối màn: nút "Đăng nhập" (`btn-strong`) + "Tạo tài khoản mới" (`btn-secondary`).

### 6.10 Section Badge & Content Sheet (màn Điều khoản)
- **Header trắng:** back · tiêu đề căn giữa · icon shield `--primary` bên phải.
- **Hero gradient:** nền `--header-gradient`, badge icon nền trắng mờ, tiêu đề + mô tả trắng.
- **Content sheet:** tấm trắng bo góc trên `28px 28px 0 0`, `z-index:1`, trượt lên `-28px` để che gọn đáy hero.
- **Section badge:** ô bo 16px (56px), icon 26px — biến thể xanh (nền `#E3EEFD`) hoặc đỏ (nền `#FDE3E3`, icon `#E5484D`).
- **Rules card:** card nền `--bg-subtle`, bo 18px, danh sách có icon tick tròn `--primary`.
- **Banner:** ảnh/gradient bo 18px, chữ trắng có shadow, icon shield mờ góc phải.

### 6.11 Chat Interactions (màn Chat & Thread)
Áp dụng cho `chat.html` và `thread.html`, style gom trong `styles.css`.

**Mở menu tin nhắn — 3 cách:** chuột phải, nhấn-giữ (mobile), hoặc **nút 3 chấm** (`.dot-btn`) hiện khi rê chuột. Nút 3 chấm **ẩn trên mobile** (`@media ≤860px`), mobile chỉ dùng nhấn-giữ.

**Context menu (`.ctx-group`):** nền tối mờ phủ màn (`.ctx-overlay`, đen .45), tin được chọn nổi sáng (`.selected`, z-index 50). Gồm:
- **Pill reactions** (`.ctx-reactions`): 👍 ❤️ 😂 😮 😢 😡, bo 30px, tách riêng phía trên menu.
- **Menu (`.ctx-menu`):** Trả lời · Trả lời trong chuỗi · Sao chép · Chuyển tiếp · Xóa với mọi người (đỏ) · Xoá chỉ bên tôi (đỏ). Khung tự co `width:fit-content` để không cắt nội dung.

**Reaction trên tin (`.reaction`):** pill nhỏ (emoji + số đếm) nằm trong hàng `.foot` cùng giờ. Tin gửi: pill nền trắng, đặt trước giờ (`order:-1`); tin nhận: pill nền `--bubble-sent`, sau giờ.

**Bottom sheet "Cảm xúc" (`.sheet`):** mở khi nhấn pill reaction; trượt lên từ đáy, nền tối mờ. Gồm tiêu đề "Cảm xúc", pill tổng hợp, và hàng người thả (avatar + tên + "Nhấn để gỡ" + emoji) — bấm để gỡ reaction.

**Trả lời (reply):** chọn "Trả lời" → thanh `.reply-bar` trên ô soạn tin (vạch xanh + "Trả lời: <tên>" + nội dung gốc + nút ×). Tên: tin của mình → "bạn", tin bạn bè → tên người gửi. Sau khi gửi, bóng chat mới có khối trích dẫn `.quote` (vạch xanh, tên xanh, nội dung gốc xám) phía trên tin.

---

## 6B. Responsive / Web Layout

Thiết kế gốc là mobile. Khi đưa lên web áp dụng quy tắc:

**Breakpoint:** `860px`.

**≥ 860px (desktop) — bố cục 2 cột:**
- **Cột trái — Brand panel:** nền navy `--bg-splash`, đặt giữa logo DNA (gradient cầu vồng) + wordmark "FBV.ONE" tím glow + tagline. Dùng cho các màn xác thực (login, mật khẩu, OTP…).
- **Cột phải — Form panel:** form đặt trong **card** nền trắng, bo 20px, viền `--border`, đổ bóng nhẹ `0 12px 40px rgba(20,60,120,.08)`, rộng tối đa 440px, căn giữa.
- Không hiển thị nút back và bottom tab bar (điều hướng theo kiểu web).

**< 860px (mobile) — khớp 100% bản gốc:**
- Ẩn brand panel; nền trắng toàn màn.
- Card trải full màn hình, bỏ viền/bóng/bo góc, padding lề `--screen-padding` (20px).
- Hiện nút back (←) góc trên trái.
- Các khối phụ (vd. "Hoặc" + social login) đẩy xuống sát đáy bằng `margin-top:auto`.

---

## 6C. Desktop Web Layout (bố cục kiểu Zalo)

Ngoài bản mobile, sản phẩm có **bản desktop riêng** bố cục nhiều cột theo phong cách Zalo web, kích hoạt ở **≥ 1024px**. Mỗi cụm chức năng là một file shell riêng; ở **< 1024px** shell tự `location.replace()` sang màn mobile tương ứng (và ngược lại), đảm bảo một entry chạy cả hai kích thước.

**Cấu trúc shell 3 cột (+ rail):**

| Vùng | Rộng | Nội dung |
|---|---|---|
| Rail điều hướng | 64px | Nền `linear-gradient(180deg,#1565E0,#0A66FF)`. Avatar (mở modal Cá nhân) + Tin nhắn · Danh bạ · Bản tin, dưới cùng: Cài đặt. Icon active nền trắng mờ. |
| Cột danh sách | 340px | Ô tìm kiếm + nút thêm bạn/nhóm; tabs; danh sách (hội thoại / danh bạ). |
| Cột chính | co giãn | Header + nội dung (khung chat, bảng tin, nhật ký…) + thanh soạn. |
| Cột thông tin | 340px | Bật/tắt. Thông tin hội thoại/nhóm, thành viên, ảnh/video, file, tìm kiếm trong trò chuyện. |

**Các file shell desktop & màn mobile tương ứng (redirect 2 chiều):**

| Shell desktop | ↔ Mobile |
|---|---|
| `app.html` (Tin nhắn: list + chat + info) | `messages.html` |
| `app-contacts.html` (Danh bạ) | `contacts.html` |
| `app-feed.html` (Bản tin) | `feed.html` |
| `app-worklog.html` (Nhật ký làm việc) | `worklog.html` |

> Nhật ký làm việc truy cập qua **tab "Khác"** trong danh sách hội thoại. Cá nhân là **modal** (không phải trang riêng).

**Kiến trúc modal dùng chung (desktop):** các modal nổi **trên màn hiện tại** (không điều hướng), style trong `styles.css`, logic trong 2 file JS nhúng vào mọi shell:
- `account-modal.js` → `openAccountModal()` (Thông tin tài khoản của tôi) + Cập nhật thông tin cá nhân.
- `desktop-modals-v2.js` → `openSettingsModal()` (Cài đặt 2 cột), `openAddFriendModal()`, `openCreateGroupModal()`, `openQRModal()` (mã QR của tôi), `openFriendModal(f)` (profile bạn bè: bìa + avatar + Nhắn tin/Gọi thoại/Gọi video + thông tin + Huỷ kết bạn/Chặn).

**Chat desktop (`app.html`):** bóng nhận trắng-trái (có avatar), gửi xanh `#DBEBFF`-phải. Rê chuột vào tin hiện thanh hành động (`.msg-acts`, có cầu nối `::after` tránh mất hover) gồm Cảm xúc · Trả lời · Chuyển tiếp · Thêm. Có modal Biểu cảm, panel Chủ đề (trả lời trong chuỗi) đầy đủ chức năng, thanh trả lời + trích dẫn, modal Chia sẻ (chuyển tiếp).

---

## 7. Iconography
Icon dạng line (nét mảnh), bo tròn đầu nét, kích thước ~24px. Trên header dùng icon trắng; trong danh sách/tab dùng icon theo màu primary (active) hoặc xám (inactive).

---

## 8. Elevation & Effects
- Giao diện phẳng, hạn chế đổ bóng. Phân tách bằng divider và màu nền nhạt.
- Wordmark logo có hiệu ứng glow tím trên nền tối.
- Header dùng gradient nhẹ thay vì shadow để tạo độ sâu.

---

## 9. CSS Variables — Tokens tổng hợp

```css
:root {
  /* Brand */
  --brand-purple: #7B2FF7;
  --brand-gold:   #F5A623;
  --brand-cyan:   #1FB6D6;
  --brand-teal:   #16A085;

  /* Primary */
  --primary:        #1877F2;
  --primary-strong: #0A66FF;
  --primary-soft:   #90C2F9;
  --primary-link:   #1A73E8;
  --header-gradient: linear-gradient(90deg,#1565E0 0%,#2E8BF0 50%,#4FA8F5 100%);

  /* Neutrals */
  --bg-splash:     #0E2745;
  --bg-base:       #FFFFFF;
  --bg-subtle:     #F7F8FA;
  --bg-chat:       #ECEFF1;
  --surface-field: #F2F3F5;
  --border:        #E3E5E8;
  --text-primary:  #1C1C1E;
  --text-secondary:#8E8E93;
  --text-on-primary:#FFFFFF;

  /* Semantic */
  --bubble-sent:     #D6EAFB;
  --bubble-received: #FFFFFF;
  --success:         #34C759;

  /* Radius */
  --radius-input:  12px;
  --radius-button: 28px;
  --radius-bubble: 16px;

  /* Spacing */
  --screen-padding: 20px;
  --field-height:   56px;
}
```

---

## 10. Screen Inventory (Màn hình tham chiếu)

| # | Màn hình | File | Đặc điểm chính |
|---|---|---|---|
| 1 | Splash | `splash.html` | Nền navy `#0E2745`, logo DNA, wordmark tím glow → tự chuyển Welcome |
| 2 | Welcome / Onboarding | `welcome.html` | Wordmark "FBV ONE" xanh, carousel 5 slide + dots, nút Đăng nhập / Tạo tài khoản |
| 3 | Đăng nhập (Email & SĐT) | `login.html` | Tab Email/Điện thoại, input, CTA, social. Email→mật khẩu, SĐT→OTP |
| 4 | Đăng ký (Email & SĐT) | `register.html` | Như đăng nhập + checkbox điều khoản; nút bật khi đủ điều kiện. Email→mật khẩu, SĐT→OTP |
| 5 | Thiết lập mật khẩu (đăng ký) | `set-password.html` | 2 ô mật khẩu + toggle mắt + field-hint ràng buộc |
| 6 | Nhập mật khẩu (đăng nhập) | `password.html` | Input password + toggle mắt, link "Quên mật khẩu?" |
| 7 | Gửi liên kết đổi mật khẩu | `reset-link.html` | Thông báo, đếm ngược gửi lại mã, nút xanh đậm |
| 8 | Nhập mã xác thực OTP | `otp.html` | 6 ô OTP tự nhảy/dán, đếm ngược, bàn phím số |
| 9 | Điều khoản sử dụng | `terms.html` | Header shield, hero gradient, section badge, rules card, banner |
| 10 | Danh sách tin nhắn | `messages.html` | Header gradient + search + QR + "+", list item (avatar/tên/preview/giờ), bottom tab |
| 11 | Khung chat | `chat.html` | Header tên + trạng thái + gọi/video, bubble gửi/nhận, menu, reactions, trả lời, sheet cảm xúc |
| 12 | Trả lời trong chuỗi | `thread.html` | Tin gốc dạng card, "N phản hồi trong chủ đề", các phản hồi + đầy đủ tương tác chat |

**Luồng điều hướng:** Splash → Welcome → (Đăng nhập | Đăng ký) → Email: mật khẩu · SĐT: OTP → Danh sách tin nhắn → Chat → Thread. Đăng ký ↔ Đăng nhập liên kết hai chiều; link "ChattingCTT" mở màn Điều khoản; hoàn tất xác thực → Danh sách tin nhắn.
```

> Bản **mobile** đầy đủ gồm ~29 file (kể cả `call`, `profile`, `search`, `scan-qr`, `add-friend`, `contacts`, `friend-requests`, `feed`, `create-post`, `account`, `my-profile`, `edit-profile`, `worklog`, `worklog-info`, `settings`, `appearance`, `about`).

### Bản Desktop (kiểu Zalo, ≥1024px)

| File | Vai trò |
|---|---|
| `app.html` | Shell Tin nhắn (list + chat + info) |
| `app-contacts.html` | Shell Danh bạ (Bạn bè / Nhóm / Lời mời) |
| `app-feed.html` | Shell Bản tin (soạn bài + posts + bình luận) |
| `app-worklog.html` | Shell Nhật ký làm việc (chat tự gửi + Phương tiện) |
| `account-modal.js` | Modal Thông tin tài khoản của tôi + Cập nhật (dùng chung) |
| `desktop-modals-v2.js` | Modal Cài đặt 2 cột (Cài đặt chung · Quyền riêng tư · Tài khoản và bảo mật · Thông tin) · Thêm bạn · Tạo nhóm · Mã QR · Profile bạn bè (dùng chung) |

Style của toàn bộ modal desktop nằm trong `styles.css` (mục ACCOUNT MODAL, Cài đặt, Thêm bạn, Tạo nhóm, QR, Profile bạn bè).