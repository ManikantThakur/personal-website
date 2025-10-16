# Formspree Configuration for Booking System

## Your Formspree Endpoint
```
https://formspree.io/f/mgvndopo
```

## A. Email Notifications (You'll receive these)

### Settings to Configure in Formspree Dashboard:

1. **Go to your form** in Formspree dashboard
2. **Click on "Settings"** or "Notifications"
3. **Enable email notifications** to your email address
4. **Set the email subject** to: `New Booking: {{booking_id}} - {{name}}`

### Email Template for Notifications (Optional):
```html
<h2>New Booking Request</h2>
<p><strong>Client:</strong> {{name}} ({{email}})</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Booking ID:</strong> {{booking_id}}</p>
<p><strong>Date:</strong> {{booking_date}}</p>
<p><strong>Time:</strong> {{booking_time}}</p>
<p><strong>Session Type:</strong> {{session_type}}</p>
<p><strong>Duration:</strong> {{session_duration}}</p>
<p><strong>Meeting Type:</strong> {{meeting_type}}</p>
<p><strong>Project Description:</strong> {{project_description}}</p>
<p><strong>Additional Notes:</strong> {{additional_notes}}</p>
```

## B. Auto-Responder (Optional - for client confirmations)

### Settings to Configure in Formspree Dashboard:

1. **Enable auto-responder** in Formspree settings
2. **Set the subject** to: `Booking Confirmation - {{booking_id}}`
3. **Use this email template**:

```html
<h2>Booking Confirmation</h2>
<p>Dear {{name}},</p>
<p>Thank you for booking a session with Manikant Thakur!</p>

<h3>Your Booking Details:</h3>
<ul>
<li><strong>Booking ID:</strong> {{booking_id}}</li>
<li><strong>Date:</strong> {{booking_date}}</li>
<li><strong>Time:</strong> {{booking_time}}</li>
<li><strong>Session Type:</strong> {{session_type}}</li>
<li><strong>Duration:</strong> {{session_duration}}</li>
<li><strong>Meeting Type:</strong> {{meeting_type}}</li>
</ul>

<p>You will receive a calendar invite shortly.</p>
<p>Best regards,<br>Manikant Thakur</p>
```

## Form Fields Being Sent

The following fields are automatically sent to Formspree:

- `name` - Client's full name
- `email` - Client's email address  
- `phone` - Client's phone number
- `session_type` - Type of session (Cloud Architecture, AI Strategy, etc.)
- `session_duration` - Duration in minutes
- `meeting_type` - Video call, phone, or in-person
- `project_description` - Client's project description
- `additional_notes` - Any additional notes
- `booking_date` - Selected date (formatted)
- `booking_time` - Selected time
- `booking_id` - Unique booking ID

## Testing Checklist

- [ ] Formspree endpoint configured in js/main.js
- [ ] Email notifications enabled in Formspree
- [ ] Auto-responder configured (optional)
- [ ] Test booking submitted successfully
- [ ] Email notification received
- [ ] Client confirmation sent (if auto-responder enabled)

## Troubleshooting

- **Form not submitting**: Check browser console for errors
- **No emails received**: Check spam folder and Formspree settings
- **Missing data**: Verify all form fields are being sent correctly