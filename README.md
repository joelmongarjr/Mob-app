My name is Joel Eliezer Youto Mongar Jr.

# JMPortfolio - Personal Portfolio Mobile Application
**Course:** SWE 3409 Mobile Application Development  
**Academic Year:** 2026/2027  
**Institution:** Institut d'Enseignement Supérieur de Ruhengeri (INES-Ruhengeri)  
**Student Name:** Joel Eliezer Youto Mongar Jr  
**Registration Number:** 25/27585  
**Individual Verification Code:** MOB-A2-7585  
**Package Identifier:** `rw.ac.ines.ug2527585.jmportfolio`  

---

## 1. Application Overview & Purpose
**JMPortfolio** is an individual, offline-first personal portfolio Android application engineered with React Native, Expo SDK 51, and TypeScript. Designed for on-the-go recruiter evaluation during interviews, internships, and engineering challenges, the app runs completely standalone without requiring Expo Go or an active internet connection. Evaluators can inspect technical competencies, academic progression, and verifiable student projects in under two minutes.

---

## 2. Core Architecture & Implemented Features

### Feature 1: Home & Introduction
- Displays the mandatory core identity statement: **“My name is Joel Eliezer Youto Mongar Jr.”**
- Shows verified profile avatar, professional headline, biographical overview, and individual verification code chip (`MOB-A2-7585`).
- Provides rapid touch targets to projects, skills, and profile customization.

### Feature 2: Skills & Academic Training Timeline
- Curates **five genuine technical skills** across Mobile Architecture, Native Foundations, Data & Storage, Backend & Cloud, and Testing & DevOps.
- Integrates a structured academic timeline with reusable `TimelineItem` components representing ongoing studies at INES-Ruhengeri and foundational scientific background.

### Feature 3: Genuine Project Portfolio
Presents two authenticated student projects with comprehensive problem statements, technical architecture, student contributions, and outcomes:
1. **EcoTrack Ruhengeri — Municipal Solid Waste Logistics App:** Offline-capable sanitation route tracking and incident reporting mobile client for municipal dispatchers with local route caching in AsyncStorage.
2. **INES Student Cooperative Credit & Savings (SACCO) Ledger:** Mobile micro-savings and credit management client for student cooperative associations with deterministic financial validation and persistent audit trails.

### Feature 4: Controlled Profile Editor with Field-Level Validation
Controlled form managing headline, biography, primary skill, and availability status with real-time feedback:
- **Rule 1 (Headline):** 5 to 70 characters.
- **Rule 2 (Biography):** 25 to 300 characters with live character counter.
- **Rule 3 (Primary Skill):** 2 to 40 characters, non-empty.
- **Save Guard:** Save button is disabled and blocked whenever validation errors are present.

### Feature 5: Native Navigation Structure
- 5-tab Bottom Navigation bar (Home, Skills, Projects, Profile, About).
- Nested Native Stack navigation for `ProjectDetails` with full parameter passing and reliable back navigation preserving list state.

### Feature 6: Camera & Gallery Media Workflow
- Image selection and capture powered by `expo-image-picker`.
- Supports live square preview, replacement from gallery, camera capture, and safe removal reverting to the default avatar.
- Handles user permission denial and selection cancellation with non-blocking feedback banners.

### Feature 7: Local Persistence with AsyncStorage
- Profile customizations and local image references are serialized to JSON and persisted under `@jmportfolio_profile_v1` using `@react-native-async-storage/async-storage`.
- State is automatically restored on cold application restart.
- Features a one-tap default reset option with confirmation dialogue.

### Feature 8: Autonomous Offline Behavior (Airplane Mode Ready)
- 100% of portfolio information, assets, wireframes, and documentation run offline.
- Optional external repository links are explicitly tagged with `(Requires Internet Connection)` and handle offline clicks gracefully.

### Feature 9: About & Verification Card
- Displays official verification card: App Name (`JMPortfolio`), Student Name (`Joel Eliezer Youto Mongar Jr`), Registration Number (`25/27585`), and Verification Code (`MOB-A2-7585`).
- Features the required data-use and privacy statement confirming zero external telemetry.

### Feature 10: Standalone Android Release Packaging
- Configured with `eas.json` for standalone Android APK generation without Expo Go.

---

## 3. Setup and Run Commands

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli eas-cli`)

### Local Development Setup
```bash
# Clone the repository
git clone https://github.com/joel-mongar/MOB_A2_2527585.git
cd MOB_A2_2527585

# Install dependencies
npm install

# Start the Expo development server
npx expo start

# Run on connected Android device or emulator
npx expo run:android
```

---

## 4. Standalone EAS Build Command
To produce the standalone installable APK without Expo Go:
```bash
# Log in to your Expo account
eas login

# Configure project if running for the first time
eas build:configure

# Build standalone Android APK using the preview profile
eas build -p android --profile preview
```
The resulting `MOB_A2_2527585.apk` can be downloaded directly from the EAS dashboard and installed on any Android device via ADB or direct transfer.

---

## 5. Physical Device Release Verification
- **Tested Physical Device:** Google Pixel 7 (Physical Device) / Samsung Galaxy A54
- **Operating System Version:** Android 14 (API Level 34)
- **Offline / Airplane Mode Test:** Confirmed 100% operational in Airplane Mode (Wi-Fi OFF, Cellular OFF).
- **Final Commit Hash:** `1b861bef0a6837d9656f1255f44a119643060a1c`
- **GitHub Repository URL:** https://github.com/joel-mongar/MOB_A2_2527585
- **GitHub Release URL:** https://github.com/joel-mongar/MOB_A2_2527585/releases/tag/v1.0.0
- **APK Download URL:** https://github.com/joel-mongar/MOB_A2_2527585/releases/download/v1.0.0/MOB_A2_2527585.apk

---

## 6. Demonstration Video Checklist (2-Minute Limit)
The demonstration video `MOB_A2_2527585_DEMO.mp4` attached to Release `v1.0.0` shows in one continuous unedited sequence:
1. Handwritten card showing Name (**Joel Eliezer Youto Mongar Jr**), Registration Number (`25/27585`), App Name (`JMPortfolio`), and Code (`MOB-A2-7585`).
2. The standalone APK launching directly from the Android home screen without Expo Go.
3. The “My name is Joel Eliezer Youto Mongar Jr.” introduction, portfolio navigation, and project details.
4. Input validation error triggered on short headline (<5 chars), followed by valid save.
5. Swiping app from recent tasks, reopening, and verifying persisted data.
6. Verification card on About screen.
7. Airplane Mode status and device clock visible in the status bar.

---

## 7. Known Limitations
- External links to GitHub repositories require network connectivity and will display an offline notice when clicked in Airplane Mode.
- Profile photo selection is constrained to local device storage; cloud backup is intentionally omitted to maintain zero-network data privacy.
