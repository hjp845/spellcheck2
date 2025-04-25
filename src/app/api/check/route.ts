import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: '너는 한국어 맞춤법 검사기야. 사용자가 보낸 문장의 맞춤법을 고쳐서 반환해줘. 틀린 부분만 수정하고 나머지는 그대로 둬.',
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.2,
      }),
    })

    const data = await openaiRes.json()
    const result = data.choices?.[0]?.message?.content?.trim() || '오류가 발생했습니다.'

    return NextResponse.json({ result })

  } catch (error) {
    console.error('[API ERROR]', error)
    return NextResponse.json({ result: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
