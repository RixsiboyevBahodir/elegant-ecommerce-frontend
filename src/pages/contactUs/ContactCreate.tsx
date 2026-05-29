export type ContactFormPayload = {
    name: string
    email: string
    message: string
}

type TelegramSendMessageResponse = {
    ok: boolean
    description?: string
}

const botToken = import.meta.env.VITE_TG_BOT_KEY?.trim()
const chatId = import.meta.env.VITE_TG_BOT_ID_KEY?.trim()

function ContactCreate({ name, email, message }: ContactFormPayload) {
    return [
        "📩 New contact form submission",
        "",
        `👤 Name: ${name}`,
        `📧 Email: ${email}`,
        `💬 Message: ${message}`,
    ].join("\n")
}

export async function sendContactToTelegram(payload: ContactFormPayload) {
    if (!botToken || !chatId) {
        throw new Error("Telegram is not configured. Add VITE_TG_KEY and VITE_TG_CHAT_ID to .env")
    }

    const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: ContactCreate(payload),
            }),
        }
    )

    const data = (await response.json()) as TelegramSendMessageResponse

    if (!response.ok || !data.ok) {
        throw new Error(data.description ?? "Failed to send message to Telegram")
    }

    return data
}