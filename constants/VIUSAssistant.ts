export interface IVIUSAssistant {
  name: string;
  code: string;
}

export class VIUSAssistant {
  static skyridge(): IVIUSAssistant {
    return { name: "Skyridge", code: process.env.NEXT_PUBLIC_SKYRIDGE as string };
  }

  static tuhaye(): IVIUSAssistant {
    return { name: "Tuhaye", code: process.env.NEXT_PUBLIC_TUHAYE as string };
  }

  static promontory(): IVIUSAssistant {
    return { name: "Promontory Club", code: process.env.NEXT_PUBLIC_PROMOTORY as string };
  }

  static marcella(): IVIUSAssistant {
    return { name: "Marcella Club", code: "Marcella" };
  }
}
