export function devLog(...messages) {
  if (process.env.NODE_ENV === 'development') {
    const formattedMessages = messages.map((msg) =>
      typeof msg === 'object'
        ? '\n' + JSON.stringify(msg, null, 2) // 객체는 들여쓰기 포함 JSON으로 변환
        : String(msg)
    );
    console.log('\x1b[33m->\x1b[0m', ...formattedMessages);
  }
}

export function debugLog(...messages) {
  if (process.env.DEBUG === 'true') {
    const formattedMessages = messages.map((msg) =>
      typeof msg === 'object'
        ? '\n' + JSON.stringify(msg, null, 2) // 객체는 들여쓰기 포함 JSON으로 변환
        : String(msg)
    );
    console.log('\x1b[34m->\x1b[0m', ...formattedMessages);
  }
}
