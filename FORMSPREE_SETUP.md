# Formspree Configuration

Both forms on the site (the **contact** form and the **session request** form) POST to a
single Formspree endpoint:

```
https://formspree.io/f/mgvndopo
```

The endpoint is set once in `js/main.js`:

```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgvndopo';
```

Submission is a `fetch` POST of `FormData` with `Accept: application/json`. On a non-2xx
response the user sees an inline error and is told to email directly.

## Fields sent

### Session request form (`#bookingForm`)

| Field                 | Notes                                                           |
| --------------------- | --------------------------------------------------------------- |
| `name`                | required                                                        |
| `email`               | required, validated client-side                                 |
| `phone`               | optional                                                        |
| `session_type`        | required                                                        |
| `duration`            | required, e.g. `60 minutes`                                     |
| `meeting_type`        | required                                                        |
| `preferred_date`      | optional, `YYYY-MM-DD` from a native date input                 |
| `preferred_time`      | optional, a labelled IST range or `Flexible`                    |
| `project_description` | optional                                                        |
| `additional_notes`    | optional                                                        |
| `_subject`            | `New session request — {name}`                                  |
| `_gotcha`             | honeypot; if non-empty the JS reports success and sends nothing |

### Contact form (`#contactForm`)

| Field                                 | Notes                            |
| ------------------------------------- | -------------------------------- |
| `name`, `email`, `subject`, `message` | all required                     |
| `_subject`                            | `New contact message: {subject}` |
| `_gotcha`                             | honeypot                         |

There is no `booking_id`, `booking_date`, `booking_time`, or `session_duration` — those
belonged to the old calendar widget and were removed.

## Dashboard settings

1. **Notifications** — enable email to your address. A useful subject is the `_subject`
   the form already sends, or `{{_subject}}`.
2. **Optional notification template:**

    ```html
    <h2>{{_subject}}</h2>
    <p><strong>From:</strong> {{name}} ({{email}}){{#phone}} · {{phone}}{{/phone}}</p>
    <p><strong>Session:</strong> {{session_type}} — {{duration}} — {{meeting_type}}</p>
    <p><strong>Preferred:</strong> {{preferred_date}} {{preferred_time}}</p>
    <p><strong>Project:</strong> {{project_description}}</p>
    <p><strong>Notes:</strong> {{additional_notes}}</p>
    <hr />
    <p><strong>Message:</strong> {{message}}</p>
    ```

    (Fields not present in a given submission render empty — one template covers both forms.)

3. **Auto-responder (optional)** — a short "thanks, I'll confirm a time by email" reply.
   Do **not** promise a calendar invite automatically; slots are confirmed by hand.
4. **Spam** — the `_gotcha` honeypot is handled client-side; Formspree also honors its own
   `_gotcha` server-side. Leave Formspree's reCAPTCHA off unless spam becomes a problem.

## Checklist

-   [ ] `FORMSPREE_ENDPOINT` in `js/main.js` is correct
-   [ ] Email notifications enabled in the Formspree dashboard
-   [ ] Test submission from the deployed site succeeds and arrives by email
-   [ ] Submitting with the honeypot filled sends nothing (dev check)
