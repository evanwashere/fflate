const ch2: Record<string, string> = {};

export default <T>(c: string, id: number, msg: unknown, transfer: ArrayBuffer[], cb: (err: Error, msg: T) => void) => {
  const w = new Worker(ch2[id] ||= URL.createObjectURL(new Blob([c], { type: 'text/javascript' })));
  w.onerror = e => cb(e.error, null);
  w.onmessage = e => cb(null, e.data);
  w.postMessage(msg, transfer);
  return w;
}