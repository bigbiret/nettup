# Google Analytics 4 Conversion Tracking Setup

## Overview
This document explains the conversion tracking implementation for nettup.no using Google Analytics 4 (GA4) events.

## Implemented Conversion Tracking

### 1. Thank You Page Conversion (`/takk`)
- **Trigger**: When users reach the thank you page after submitting contact form
- **Event**: `thank_you_page_view`
- **Category**: `conversion`
- **Label**: `contact_form_submission`
- **Value**: 1
- **Custom Parameters**: 
  - `custom_parameter_1`: `form_completion`
  - `custom_parameter_2`: `contact_page`

### 2. Booking Consultation Clicks
- **Trigger**: When users click any Calendly booking button
- **Event**: `booking_consultation_click`
- **Category**: `conversion`
- **Label**: `calendly_booking`
- **Value**: 1

## GA4 Events Configuration

### Custom Events in Google Analytics
The following custom events will appear in your GA4 property:

1. **`thank_you_page_view`** - Form submission conversions
2. **`booking_consultation_click`** - Booking button clicks

### Setting Up Goals in GA4
1. Go to your GA4 property
2. Navigate to **Configure** → **Events**
3. Create custom conversions for:
   - `thank_you_page_view` events
   - `booking_consultation_click` events

### Creating Conversions in GA4
1. Go to **Configure** → **Conversions**
2. Click **"New conversion event"**
3. Add the event names:
   - `thank_you_page_view`
   - `booking_consultation_click`

## Privacy and GDPR Compliance

### Cookie Consent Integration
- All conversion tracking respects user cookie consent
- Events are only tracked when consent is `accepted`
- No tracking occurs without explicit consent

### Data Anonymization
- IP addresses are anonymized
- No personal data is collected
- Advertising features are disabled for GDPR compliance

## Testing Conversion Tracking

### Test Thank You Page
1. Submit the contact form
2. Navigate to `/takk`
3. Check GA4 Real-Time reports for `thank_you_page_view` event

### Test Booking Clicks
1. Click any "Book konsultasjon" button
2. Check GA4 Real-Time reports for `booking_consultation_click` event

## Monitoring and Reporting

### Real-Time Reports
- Go to **Reports** → **Realtime** in GA4
- Look for custom events in the event stream

### Conversion Reports
- Go to **Reports** → **Engagement** → **Events**
- Filter by event names to see conversion data

### Custom Reports
Create custom reports in GA4 to track:
- Conversion rates by page
- Booking funnel analysis
- Form completion rates
