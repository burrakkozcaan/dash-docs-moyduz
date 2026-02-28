export type User = {
  id: string
  name: string
  avatarUrl?: string
  role?: string
}

export type NoteType = "general" | "meeting" | "audio"
export type NoteStatus = "completed" | "processing"

export type TranscriptSegment = {
  id: string
  speaker: string
  timestamp: string
  text: string
}

export type AudioNoteData = {
  duration: string
  fileName: string
  aiSummary: string
  keyPoints: string[]
  insights: string[]
  transcript: TranscriptSegment[]
}

export type Note = {
  id: string
  title: string
  content?: string
  noteType: NoteType
  status: NoteStatus
  addedDate: Date
  addedBy: User
  audioData?: AudioNoteData
}

export const CURRENT_USER: User = {
  id: "user-1",
  name: "Ahmet Yılmaz",
  avatarUrl: undefined,
  role: "Admin",
}

export const MOCK_NOTES: Note[] = [
  {
    id: "note-1",
    title: "Proje incelemesi",
    noteType: "audio",
    status: "completed",
    addedDate: new Date(2025, 6, 12),
    addedBy: CURRENT_USER,
    audioData: {
      duration: "00:02:21",
      fileName: "proje-inceleme-toplantisi.mp3",
      aiSummary:
        "Toplantıda devam eden projeler incelendi ve sonraki adımlar planlandı. Ekip, yeni özellikler ve görevler kararlaştırmadan önce bu haftaki kullanıcı testlerinden geri bildirim toplamayı görüştü. Sözleşme ödemeleri ve açılış sayfası tasarımına ilişkin konular da ele alındı.",
      keyPoints: [
        "Kullanıcı testi bu hafta yapılacak",
        "Yeni özellikler geri bildirimden sonra belirlenecek",
        "Sözleşme ödeme takvimi onaylandı",
        "Açılış sayfası tasarımı devam ediyor",
      ],
      insights: [
        "Ekip öncelikleri konusunda iyi hizalanmış durumda",
        "Özellik kapsamı hakkında daha fazla netlik gerekiyor",
        "Geliştirmeden önce tasarım incelemesi yapılmalı",
      ],
      transcript: [
        {
          id: "t1",
          speaker: "SPK_1",
          timestamp: "0:00",
          text: "Kurucu ortak bir saniyeye kadar katılacak, ama onu geçen sefer konuştuklarımıza hızlıca güncelliyorum.",
        },
        {
          id: "t2",
          speaker: "SPK_2",
          timestamp: "0:15",
          text: "Şu an nerede olduğumuzu, ne tür bir yardıma ihtiyaç duyduğumuzu ve ilgileniyorsanız ilerleyen süreçte bir deneme çalışmasının nasıl görüneceğini anlatacağım.",
        },
        {
          id: "t3",
          speaker: "SPK_1",
          timestamp: "0:22",
          text: "Bugün bu detayları konuşmayı umuyorum. Ayrıca tasarım ve önerileriniz varsa onları da duymak isteriz.",
        },
        {
          id: "t4",
          speaker: "SPK_2",
          timestamp: "0:38",
          text: "Tabii, anlıyorum.",
        },
        {
          id: "t5",
          speaker: "SPK_3",
          timestamp: "0:43",
          text: "Kulağa güzel geliyor.",
        },
        {
          id: "t6",
          speaker: "SPK_1",
          timestamp: "0:55",
          text: "Evet, o zaman bir dakika bekleyelim.",
        },
        {
          id: "t7",
          speaker: "SPK_2",
          timestamp: "1:00",
          text: "Geliyor olmalı ama henüz katılmadı.",
        },
      ],
    },
  },
  {
    id: "note-2",
    title: "Toplantı notu",
    noteType: "meeting",
    status: "completed",
    addedDate: new Date(2024, 8, 18),
    addedBy: CURRENT_USER,
    content:
      "Mevcut sprint hedefleri, açık sorunlar ve tasarım handoff için sonraki adımlara ilişkin tartışma.",
  },
  {
    id: "note-3",
    title: "Müşteri geri bildirimi",
    noteType: "general",
    status: "completed",
    addedDate: new Date(2024, 8, 18),
    addedBy: CURRENT_USER,
    content:
      "Müşteri, en son anasayfa versiyonu hakkında geri bildirim paylaştı. Ana endişe, hero kopyasının netliği.",
  },
  {
    id: "note-4",
    title: "İç beyin fırtınası",
    noteType: "general",
    status: "completed",
    addedDate: new Date(2024, 8, 17),
    addedBy: CURRENT_USER,
    content:
      "Kontrol listeleri, ilerleme göstergeleri ve satır içi ipuçları dahil olmak üzere katılım iyileştirmeleri için fikirler.",
  },
  {
    id: "note-5",
    title: "Hero Açıklaması",
    noteType: "general",
    status: "completed",
    addedDate: new Date(2024, 8, 17),
    addedBy: CURRENT_USER,
    content:
      "A/B testi için hero bölümü başlığı ve destekleyici açıklama için kopya seçenekleri.",
  },
  {
    id: "note-6",
    title: "Ödünleşim",
    noteType: "meeting",
    status: "processing",
    addedDate: new Date(2024, 8, 17),
    addedBy: CURRENT_USER,
    content:
      "Yeni gösterge paneli widget'ları için performans ve esneklik arasındaki ödünleşimlere ilişkin notlar.",
  },
  {
    id: "note-7",
    title: "Yol haritası",
    noteType: "general",
    status: "completed",
    addedDate: new Date(2024, 8, 16),
    addedBy: CURRENT_USER,
    content:
      "Analitik ve iş birliği özelliklerine odaklanan sonraki iki çeyrek için üst düzey yol haritası.",
  },
  {
    id: "note-8",
    title: "Beyin fırtınası",
    noteType: "general",
    status: "completed",
    addedDate: new Date(2024, 8, 16),
    addedBy: CURRENT_USER,
    content:
      "Potansiyel entegrasyonlar ve otomasyon fırsatları üzerine kaba beyin fırtınası.",
  },
]
