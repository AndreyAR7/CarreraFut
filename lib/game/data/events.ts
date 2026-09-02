import { EventDefinition } from "../types";

export const EVENTS: EventDefinition[] = [
  {
    key: "mundial_penales",
    category: "SELECCION",
    title: "Definición por penales en el Mundial",
    description:
      "El partido llegó a los penales. El cuerpo técnico te pregunta si querés patear uno de los definitivos.",
    minAge: 16,
    maxAge: 41,
    // weight: 0 — never picked by the random end-of-season event roll. It's only ever
    // triggered directly from advanceSeason() when the national team hits a decisive shootout.
    weight: 0,
    options: [
      {
        key: "izquierda",
        label: "⬅️ Rematar a la izquierda",
        description: "Buscás el palo izquierdo: más difícil de alcanzar para el arquero, pero también más fácil de errar.",
        outcomes: [
          {
            id: "gol",
            chance: 0.55,
            summary: "¡La clavaste en el palo izquierdo! Tu selección se consagra campeona del mundo y sos la figura del partido.",
            effects: { reputationDelta: 25, marketValueMultiplier: 1.15, moraleDelta: 15, awardsWorldCup: true },
          },
          {
            id: "atajada",
            chance: 0.2,
            summary: "El arquero rival se estiró entero y te la adivinó. Tu selección quedó eliminada y el golpe te pesa en la reputación.",
            effects: { reputationDelta: -20, moraleDelta: -15 },
          },
          {
            id: "afuera",
            chance: 0.25,
            summary: "La tiraste afuera, por izquierda. Tu selección quedó eliminada y te vas a cargar ese fallo un buen tiempo.",
            effects: { reputationDelta: -22, moraleDelta: -17 },
          },
        ],
      },
      {
        key: "centro",
        label: "⬆️ Rematar al centro",
        description: "Vas al medio: rara vez se te va afuera, pero es más fácil que el arquero se quede parado y la ataje.",
        outcomes: [
          {
            id: "gol",
            chance: 0.45,
            summary: "¡La clavaste al medio! Tu selección se consagra campeona del mundo y sos la figura del partido.",
            effects: { reputationDelta: 25, marketValueMultiplier: 1.15, moraleDelta: 15, awardsWorldCup: true },
          },
          {
            id: "atajada",
            chance: 0.4,
            summary: "El arquero ni se movió, se quedó parado y te la atajó. Tu selección quedó eliminada y el golpe te pesa en la reputación.",
            effects: { reputationDelta: -20, moraleDelta: -15 },
          },
          {
            id: "afuera",
            chance: 0.15,
            summary: "La tiraste afuera por el medio. Tu selección quedó eliminada y te vas a cargar ese fallo un buen tiempo.",
            effects: { reputationDelta: -22, moraleDelta: -17 },
          },
        ],
      },
      {
        key: "derecha",
        label: "➡️ Rematar a la derecha",
        description: "Buscás el palo derecho: más difícil de alcanzar para el arquero, pero también más fácil de errar.",
        outcomes: [
          {
            id: "gol",
            chance: 0.55,
            summary: "¡La clavaste en el palo derecho! Tu selección se consagra campeona del mundo y sos la figura del partido.",
            effects: { reputationDelta: 25, marketValueMultiplier: 1.15, moraleDelta: 15, awardsWorldCup: true },
          },
          {
            id: "atajada",
            chance: 0.2,
            summary: "El arquero rival se estiró entero y te la adivinó. Tu selección quedó eliminada y el golpe te pesa en la reputación.",
            effects: { reputationDelta: -20, moraleDelta: -15 },
          },
          {
            id: "afuera",
            chance: 0.25,
            summary: "La tiraste afuera, por derecha. Tu selección quedó eliminada y te vas a cargar ese fallo un buen tiempo.",
            effects: { reputationDelta: -22, moraleDelta: -17 },
          },
        ],
      },
      {
        key: "ceder",
        label: "Dejar que patee otro",
        description: "Preferís no cargar con la responsabilidad y dejás el resultado en manos de un compañero.",
        outcomes: [
          {
            id: "gol",
            chance: 0.5,
            summary: "Tu compañero convierte y la selección se consagra campeona del mundo.",
            effects: { reputationDelta: 4, moraleDelta: 5, awardsWorldCup: true },
          },
          {
            id: "atajada",
            chance: 0.3,
            summary: "Al arquero rival le adivinaron el remate. El equipo quedó eliminado, aunque nadie te señala a vos.",
            effects: { moraleDelta: -4 },
          },
          {
            id: "afuera",
            chance: 0.2,
            summary: "Tu compañero la tiró afuera. El equipo quedó eliminado, aunque nadie te señala a vos.",
            effects: { moraleDelta: -4 },
          },
        ],
      },
    ],
  },
  {
    key: "champions_penales",
    category: "CLUB",
    title: "Definición por penales en la final continental",
    description:
      "La final se define desde los doce pasos. El capitán te mira: ¿pateás uno de los definitivos?",
    minAge: 16,
    maxAge: 41,
    // weight: 0 — only ever triggered directly from advanceSeason() when a continental final
    // comes down to a decisive shootout.
    weight: 0,
    options: [
      {
        key: "izquierda",
        label: "⬅️ Rematar a la izquierda",
        description: "Buscás el palo izquierdo: más difícil de alcanzar para el arquero, pero también más fácil de errar.",
        outcomes: [
          {
            id: "gol",
            chance: 0.55,
            summary: "¡La clavaste en el palo izquierdo! Tu equipo se consagra campeón y sos la gran figura de la final.",
            effects: { reputationDelta: 20, marketValueMultiplier: 1.12, moraleDelta: 14, awardsContinentalTitle: true },
          },
          {
            id: "atajada",
            chance: 0.2,
            summary: "El arquero rival se estiró entero y te la adivinó. Tu equipo se queda sin el título y el golpe te pesa.",
            effects: { reputationDelta: -16, moraleDelta: -14 },
          },
          {
            id: "afuera",
            chance: 0.25,
            summary: "La tiraste afuera, por izquierda. Tu equipo se queda sin el título en la peor forma posible.",
            effects: { reputationDelta: -18, moraleDelta: -16 },
          },
        ],
      },
      {
        key: "centro",
        label: "⬆️ Rematar al centro",
        description: "Vas al medio: rara vez se te va afuera, pero es más fácil que el arquero se quede parado y la ataje.",
        outcomes: [
          {
            id: "gol",
            chance: 0.45,
            summary: "¡La clavaste al medio! Tu equipo se consagra campeón y sos la gran figura de la final.",
            effects: { reputationDelta: 20, marketValueMultiplier: 1.12, moraleDelta: 14, awardsContinentalTitle: true },
          },
          {
            id: "atajada",
            chance: 0.4,
            summary: "El arquero ni se movió, se quedó parado y te la atajó. Tu equipo se queda sin el título y el golpe te pesa.",
            effects: { reputationDelta: -16, moraleDelta: -14 },
          },
          {
            id: "afuera",
            chance: 0.15,
            summary: "La tiraste afuera por el medio. Tu equipo se queda sin el título en la peor forma posible.",
            effects: { reputationDelta: -18, moraleDelta: -16 },
          },
        ],
      },
      {
        key: "derecha",
        label: "➡️ Rematar a la derecha",
        description: "Buscás el palo derecho: más difícil de alcanzar para el arquero, pero también más fácil de errar.",
        outcomes: [
          {
            id: "gol",
            chance: 0.55,
            summary: "¡La clavaste en el palo derecho! Tu equipo se consagra campeón y sos la gran figura de la final.",
            effects: { reputationDelta: 20, marketValueMultiplier: 1.12, moraleDelta: 14, awardsContinentalTitle: true },
          },
          {
            id: "atajada",
            chance: 0.2,
            summary: "El arquero rival se estiró entero y te la adivinó. Tu equipo se queda sin el título y el golpe te pesa.",
            effects: { reputationDelta: -16, moraleDelta: -14 },
          },
          {
            id: "afuera",
            chance: 0.25,
            summary: "La tiraste afuera, por derecha. Tu equipo se queda sin el título en la peor forma posible.",
            effects: { reputationDelta: -18, moraleDelta: -16 },
          },
        ],
      },
      {
        key: "ceder",
        label: "Dejar que patee otro",
        description: "Preferís no cargar con la responsabilidad y dejás el resultado en manos de un compañero.",
        outcomes: [
          {
            id: "gol",
            chance: 0.5,
            summary: "Tu compañero convierte y el equipo se consagra campeón.",
            effects: { reputationDelta: 3, moraleDelta: 5, awardsContinentalTitle: true },
          },
          {
            id: "atajada",
            chance: 0.3,
            summary: "Al arquero rival le adivinaron el remate. El equipo se queda sin el título, aunque nadie te señala a vos.",
            effects: { moraleDelta: -3 },
          },
          {
            id: "afuera",
            chance: 0.2,
            summary: "Tu compañero la tiró afuera. El equipo se queda sin el título, aunque nadie te señala a vos.",
            effects: { moraleDelta: -3 },
          },
        ],
      },
    ],
  },
  {
    key: "copa_penales",
    category: "CLUB",
    title: "Definición por penales en la final de copa",
    description:
      "La final de copa se define desde los doce pasos. El capitán te mira: ¿pateás uno de los definitivos?",
    minAge: 16,
    maxAge: 41,
    // weight: 0 — only ever triggered directly from advanceSeason() when a domestic cup final
    // comes down to a decisive shootout.
    weight: 0,
    options: [
      {
        key: "izquierda",
        label: "⬅️ Rematar a la izquierda",
        description: "Buscás el palo izquierdo: más difícil de alcanzar para el arquero, pero también más fácil de errar.",
        outcomes: [
          {
            id: "gol",
            chance: 0.55,
            summary: "¡La clavaste en el palo izquierdo! Tu equipo se consagra campeón de la copa y sos la gran figura de la final.",
            effects: { reputationDelta: 15, marketValueMultiplier: 1.08, moraleDelta: 12, awardsDomesticCupTitle: true },
          },
          {
            id: "atajada",
            chance: 0.2,
            summary: "El arquero rival se estiró entero y te la adivinó. Tu equipo se queda sin la copa y el golpe te pesa.",
            effects: { reputationDelta: -12, moraleDelta: -12 },
          },
          {
            id: "afuera",
            chance: 0.25,
            summary: "La tiraste afuera, por izquierda. Tu equipo se queda sin la copa en la peor forma posible.",
            effects: { reputationDelta: -14, moraleDelta: -14 },
          },
        ],
      },
      {
        key: "centro",
        label: "⬆️ Rematar al centro",
        description: "Vas al medio: rara vez se te va afuera, pero es más fácil que el arquero se quede parado y la ataje.",
        outcomes: [
          {
            id: "gol",
            chance: 0.45,
            summary: "¡La clavaste al medio! Tu equipo se consagra campeón de la copa y sos la gran figura de la final.",
            effects: { reputationDelta: 15, marketValueMultiplier: 1.08, moraleDelta: 12, awardsDomesticCupTitle: true },
          },
          {
            id: "atajada",
            chance: 0.4,
            summary: "El arquero ni se movió, se quedó parado y te la atajó. Tu equipo se queda sin la copa y el golpe te pesa.",
            effects: { reputationDelta: -12, moraleDelta: -12 },
          },
          {
            id: "afuera",
            chance: 0.15,
            summary: "La tiraste afuera por el medio. Tu equipo se queda sin la copa en la peor forma posible.",
            effects: { reputationDelta: -14, moraleDelta: -14 },
          },
        ],
      },
      {
        key: "derecha",
        label: "➡️ Rematar a la derecha",
        description: "Buscás el palo derecho: más difícil de alcanzar para el arquero, pero también más fácil de errar.",
        outcomes: [
          {
            id: "gol",
            chance: 0.55,
            summary: "¡La clavaste en el palo derecho! Tu equipo se consagra campeón de la copa y sos la gran figura de la final.",
            effects: { reputationDelta: 15, marketValueMultiplier: 1.08, moraleDelta: 12, awardsDomesticCupTitle: true },
          },
          {
            id: "atajada",
            chance: 0.2,
            summary: "El arquero rival se estiró entero y te la adivinó. Tu equipo se queda sin la copa y el golpe te pesa.",
            effects: { reputationDelta: -12, moraleDelta: -12 },
          },
          {
            id: "afuera",
            chance: 0.25,
            summary: "La tiraste afuera, por derecha. Tu equipo se queda sin la copa en la peor forma posible.",
            effects: { reputationDelta: -14, moraleDelta: -14 },
          },
        ],
      },
      {
        key: "ceder",
        label: "Dejar que patee otro",
        description: "Preferís no cargar con la responsabilidad y dejás el resultado en manos de un compañero.",
        outcomes: [
          {
            id: "gol",
            chance: 0.5,
            summary: "Tu compañero convierte y el equipo se consagra campeón de la copa.",
            effects: { reputationDelta: 3, moraleDelta: 4, awardsDomesticCupTitle: true },
          },
          {
            id: "atajada",
            chance: 0.3,
            summary: "Al arquero rival le adivinaron el remate. El equipo se queda sin la copa, aunque nadie te señala a vos.",
            effects: { moraleDelta: -3 },
          },
          {
            id: "afuera",
            chance: 0.2,
            summary: "Tu compañero la tiró afuera. El equipo se queda sin la copa, aunque nadie te señala a vos.",
            effects: { moraleDelta: -3 },
          },
        ],
      },
    ],
  },
  {
    key: "capitania_moral",
    category: "PERSONAL",
    title: "Te ganaste el vestuario",
    description:
      "Tu compromiso y tu buena onda constante no pasaron desapercibidos: el cuerpo técnico te ofrece la cinta de capitán.",
    minAge: 16,
    maxAge: 41,
    // weight: 0 — only ever triggered directly from advanceSeason() the first time the
    // player's morale reaches 80+ (see careerEngine.ts), never picked at random.
    weight: 0,
    options: [
      {
        key: "aceptar_cinta_moral",
        label: "Aceptar la cinta",
        description: "Asumís el liderazgo del plantel.",
        outcomes: [
          {
            id: "lider_moral",
            chance: 0.75,
            summary: "Tu buen momento anímico se trasladó al liderazgo: el grupo respondió de gran manera a la cinta.",
            effects: { statDeltas: { mentality: 3 }, reputationDelta: 10 },
          },
          {
            id: "peso_extra_moral",
            chance: 0.25,
            summary: "La responsabilidad extra, justo en tu mejor momento anímico, te generó algo más de presión de la esperada.",
            effects: { moraleDelta: -4 },
          },
        ],
      },
      {
        key: "declinar_cinta_moral",
        label: "Declinar por ahora",
        description: "Preferís enfocarte solo en tu juego.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Preferiste no asumir esa responsabilidad todavía.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "invitacion_reality",
    category: "MEDIA",
    title: "Invitación a un reality show",
    description: "Un programa de telerrealidad te invita a participar durante la pretemporada.",
    minAge: 18,
    maxAge: 34,
    weight: 5,
    options: [
      {
        key: "participar_reality",
        label: "Participar",
        description: "Ganás exposición mediática, pero te resta foco en lo deportivo.",
        outcomes: [
          {
            id: "exito_reality",
            chance: 0.5,
            summary: "Caíste súper bien en cámara y tu popularidad creció fuerte.",
            effects: { reputationDelta: 12, marketValueMultiplier: 1.04 },
          },
          {
            id: "distraccion_reality",
            chance: 0.5,
            summary: "El ida y vuelta con las cámaras te sacó concentración de la pretemporada.",
            effects: { statDeltas: { physical: -2 }, moraleDelta: -3 },
          },
        ],
      },
      {
        key: "rechazar_reality",
        label: "Rechazar la invitación",
        description: "Preferís enfocarte de lleno en la pretemporada.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Rechazaste la propuesta y seguiste con tu preparación normal.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "partido_solidario",
    category: "PERSONAL",
    title: "Partido a beneficio",
    description: "Te invitan a jugar un amistoso solidario días antes de un partido importante.",
    minAge: 17,
    maxAge: 38,
    weight: 4,
    options: [
      {
        key: "jugar_solidario",
        label: "Jugar el amistoso",
        description: "Ayudás a la causa, aunque te arriesgás a llegar cansado al partido importante.",
        outcomes: [
          {
            id: "bien_solidario",
            chance: 0.6,
            summary: "El gesto solidario fue muy valorado y llegaste bien al partido importante.",
            effects: { reputationDelta: 9, moraleDelta: 5 },
          },
          {
            id: "mal_solidario",
            chance: 0.4,
            summary: "Llegaste con las piernas pesadas al partido importante por el desgaste extra.",
            effects: { fitnessDelta: -8 },
          },
        ],
      },
      {
        key: "declinar_solidario",
        label: "Declinar la invitación",
        description: "Preferís cuidarte para el partido importante.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Declinaste la invitación para llegar descansado.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "cambio_posicion",
    category: "ENTRENAMIENTO",
    title: "El técnico te pide jugar en otra posición",
    description: "El cuerpo técnico necesita que ocupes un rol distinto al tuyo habitual por unas semanas.",
    minAge: 17,
    maxAge: 34,
    weight: 5,
    options: [
      {
        key: "aceptar_cambio",
        label: "Aceptar el cambio",
        description: "Te adaptás al pedido del técnico, aunque no sea tu rol natural.",
        outcomes: [
          {
            id: "versatil",
            chance: 0.5,
            summary: "Mostraste versatilidad y el técnico valoró muchísimo tu buena predisposición.",
            effects: { statDeltas: { mentality: 2 }, reputationDelta: 6 },
          },
          {
            id: "incomodo",
            chance: 0.5,
            summary: "Te sentiste incómodo fuera de tu posición natural y bajó tu rendimiento.",
            effects: { moraleDelta: -5, statDeltas: { mentality: -1 } },
          },
        ],
      },
      {
        key: "pedir_posicion_natural",
        label: "Pedir seguir en tu posición natural",
        description: "Preferís no arriesgar tu rendimiento habitual.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "El técnico respetó tu pedido y seguiste en tu posición de siempre.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "prestamo_familiar",
    category: "FINANZAS",
    title: "Un familiar te pide un préstamo",
    description: "Un familiar cercano te pide plata prestada para salir de un apuro económico.",
    minAge: 18,
    maxAge: 38,
    weight: 4,
    options: [
      {
        key: "prestar_plata",
        label: "Prestarle el dinero",
        description: "Ayudás a tu familia, aunque no hay garantías de que te lo devuelvan.",
        outcomes: [
          {
            id: "devuelve",
            chance: 0.5,
            summary: "Tu familiar te devolvió todo a tiempo y el vínculo familiar se fortaleció.",
            effects: { moraleDelta: 8 },
          },
          {
            id: "no_devuelve",
            chance: 0.5,
            summary: "Tu familiar nunca te devolvió el dinero y quedó un poco de tensión en la familia.",
            effects: { moraleDelta: -6, marketValueMultiplier: 0.99 },
          },
        ],
      },
      {
        key: "no_prestar",
        label: "No prestarle el dinero",
        description: "Preferís cuidar tus finanzas, aunque genere un mal momento.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Decidiste no prestar el dinero para cuidar tus finanzas.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "informacion_privilegiada",
    category: "DISCIPLINA",
    title: "Información privilegiada",
    description: "Un grupo de apostadores te ofrece plata a cambio de información interna del plantel.",
    minAge: 18,
    maxAge: 37,
    weight: 4,
    options: [
      {
        key: "aceptar_info",
        label: "Aceptar",
        description: "Te llevás un dinero extra por pasar información, pero es un secreto que puede volverse en tu contra.",
        outcomes: [
          {
            id: "impune_info",
            chance: 1,
            summary: "Cobraste sin que nadie se enterara... por ahora.",
            effects: { marketValueMultiplier: 1.04, moraleDelta: 1, scandalFollowupKey: "escandalo_apuestas_estalla" },
          },
        ],
      },
      {
        key: "rechazar_info",
        label: "Rechazar",
        description: "No pasa nada, seguís enfocado en lo tuyo.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Rechazaste la oferta y seguiste tu carrera como si nada hubiera pasado.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "escandalo_apuestas_estalla",
    category: "DISCIPLINA",
    title: "Sale a la luz la filtración a las apuestas",
    description: "Una investigación destapó que pasabas información interna a un grupo de apostadores. La noticia ya está en todos lados.",
    minAge: 16,
    maxAge: 41,
    // weight: 0 — only ever forced onto the career a couple of decisions after accepting the
    // deal in "informacion_privilegiada" (see pendingScandalKey).
    weight: 0,
    options: [
      {
        key: "dar_la_cara",
        label: "Dar la cara ante la prensa",
        description: "El club no quiere quedar salpicado por el escándalo y decide desvincularte.",
        outcomes: [
          {
            id: "salida_forzada",
            chance: 1,
            summary: "El escándalo de las apuestas explotó en las noticias. El club te desechó para cuidar su imagen y tuviste que salir a reconstruir tu carrera en otro lado.",
            effects: { reputationDelta: -25, moraleDelta: -20, forcesDemotionScandal: true },
          },
        ],
      },
    ],
  },
  {
    key: "oferta_academia",
    category: "ENTRENAMIENTO",
    title: "Invitación a una academia de élite",
    description: "Una academia de fútbol reconocida internacionalmente te invita a una pasantía intensiva de un mes.",
    minAge: 16,
    maxAge: 26,
    weight: 5,
    options: [
      {
        key: "ir_academia",
        label: "Ir a la pasantía",
        description: "Podés dar un salto técnico importante, aunque el nivel de exigencia es muy alto.",
        outcomes: [
          {
            id: "salto_tecnico",
            chance: 0.55,
            summary: "La pasantía fue un salto enorme para tu técnica y tu confianza.",
            effects: { statDeltas: { passing: 2, shooting: 2 } },
          },
          {
            id: "sobreexigencia",
            chance: 0.45,
            summary: "El nivel de exigencia te pasó factura físicamente.",
            effects: { fitnessDelta: -10, moraleDelta: -3 },
          },
        ],
      },
      {
        key: "quedarse_club",
        label: "Quedarte entrenando con tu club",
        description: "Preferís no interrumpir tu rutina habitual.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Seguiste con tu rutina habitual de entrenamiento.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "critica_excompanero",
    category: "MEDIA",
    title: "Un ex compañero te critica en una entrevista",
    description: "Un ex compañero de equipo declaró públicamente que te sobrevaloran como jugador.",
    minAge: 18,
    maxAge: 38,
    weight: 4,
    options: [
      {
        key: "responder_critica",
        label: "Responderle públicamente",
        description: "Salís a contestarle en tus propios términos.",
        outcomes: [
          {
            id: "gana_respeto",
            chance: 0.5,
            summary: "Tu respuesta fue contundente y ganaste el respeto de la gente.",
            effects: { reputationDelta: 7, moraleDelta: 4 },
          },
          {
            id: "escala_conflicto",
            chance: 0.5,
            summary: "El ida y vuelta escaló y quedaste envuelto en una polémica innecesaria.",
            effects: { reputationDelta: -6, moraleDelta: -5 },
          },
        ],
      },
      {
        key: "ignorar_critica",
        label: "No responder",
        description: "Preferís dejar que hable el juego.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "No respondiste y dejaste que el tema se apagara solo.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "oferta_marca_propia",
    category: "FINANZAS",
    title: "Propuesta para lanzar tu propia marca",
    description: "Te proponen lanzar tu propia línea de botines o indumentaria deportiva.",
    minAge: 20,
    maxAge: 36,
    weight: 4,
    options: [
      {
        key: "lanzar_marca",
        label: "Lanzar la marca",
        description: "Invertís tiempo y dinero propio en el proyecto.",
        outcomes: [
          {
            id: "marca_exitosa",
            chance: 0.5,
            summary: "La marca despegó mucho mejor de lo esperado.",
            effects: { marketValueMultiplier: 1.06, reputationDelta: 5 },
          },
          {
            id: "marca_fracasa",
            chance: 0.5,
            summary: "El proyecto no prendió y perdiste la inversión inicial.",
            effects: { marketValueMultiplier: 0.98, moraleDelta: -4 },
          },
        ],
      },
      {
        key: "no_lanzar_marca",
        label: "No arriesgarte con el proyecto",
        description: "Preferís no meterte en algo fuera de la cancha.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Decidiste no arriesgarte con el proyecto por ahora.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "conflicto_pareja",
    category: "PERSONAL",
    title: "Tensión en tu relación de pareja",
    description: "Los viajes constantes y la exigencia de la carrera generaron tensión en tu relación.",
    minAge: 19,
    maxAge: 37,
    weight: 4,
    options: [
      {
        key: "priorizar_relacion",
        label: "Bajar un cambio para cuidar la relación",
        description: "Le dedicás tiempo extra a tu vida personal.",
        outcomes: [
          {
            id: "relacion_mejora",
            chance: 1,
            summary: "Pudiste recomponer la relación y ganaste tranquilidad mental.",
            effects: { moraleDelta: 10 },
          },
        ],
      },
      {
        key: "priorizar_carrera",
        label: "Seguir enfocado en tu carrera",
        description: "Delegás lo personal para no perder ritmo competitivo.",
        outcomes: [
          {
            id: "carrera_rendimiento",
            chance: 0.5,
            summary: "El enfoque total en lo deportivo se notó en tu rendimiento.",
            effects: { statDeltas: { mentality: 2 } },
          },
          {
            id: "carrera_desgaste",
            chance: 0.5,
            summary: "La tensión sin resolver en lo personal te terminó pasando factura.",
            effects: { moraleDelta: -7 },
          },
        ],
      },
    ],
  },
  {
    key: "rumor_transferencia",
    category: "MEDIA",
    title: "Rumores de transferencia sin confirmar",
    description: "La prensa instaló un rumor de pase tuyo a otro club que nadie del club confirma ni desmiente.",
    minAge: 18,
    maxAge: 36,
    weight: 5,
    options: [
      {
        key: "aclarar_rumor",
        label: "Salir a aclarar la situación",
        description: "Publicás un mensaje propio para bajar el ruido mediático.",
        outcomes: [
          {
            id: "rumor_calma",
            chance: 0.6,
            summary: "Tu mensaje calmó las aguas y todo volvió a la normalidad.",
            effects: { reputationDelta: 4 },
          },
          {
            id: "rumor_empeora",
            chance: 0.4,
            summary: "Tu propio mensaje alimentó todavía más la especulación.",
            effects: { moraleDelta: -5 },
          },
        ],
      },
      {
        key: "ignorar_rumor",
        label: "No decir nada",
        description: "Preferís dejar que el club maneje la situación.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "No dijiste nada y el rumor perdió fuerza con el tiempo.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "regalo_hincha",
    category: "PERSONAL",
    title: "Un hincha te regala algo muy costoso",
    description: "Un hincha se te acerca después de un partido y te regala algo de gran valor económico.",
    minAge: 17,
    maxAge: 38,
    weight: 3,
    options: [
      {
        key: "aceptar_regalo",
        label: "Aceptar el regalo",
        description: "El gesto te emociona, aunque no sabés bien las intenciones detrás.",
        outcomes: [
          {
            id: "regalo_lindo",
            chance: 0.6,
            summary: "Fue un gesto genuino de cariño que te llenó de emoción.",
            effects: { moraleDelta: 8 },
          },
          {
            id: "regalo_incomodo",
            chance: 0.4,
            summary: "Después te enteraste que el hincha esperaba favores a cambio, y quedaste incómodo con la situación.",
            effects: { moraleDelta: -6, reputationDelta: -3 },
          },
        ],
      },
      {
        key: "rechazar_regalo",
        label: "Rechazar el regalo con respeto",
        description: "Preferís no aceptar nada que pueda generar compromisos.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Rechazaste el regalo amablemente para no generar compromisos.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "oferta_pelicula",
    category: "MEDIA",
    title: "Propuesta para un papel en una película",
    description: "Una productora te ofrece un pequeño papel en una película sobre fútbol.",
    minAge: 20,
    maxAge: 36,
    weight: 3,
    options: [
      {
        key: "aceptar_pelicula",
        label: "Aceptar el papel",
        description: "Sumás una experiencia nueva y exposición mediática.",
        outcomes: [
          {
            id: "pelicula_exito",
            chance: 0.5,
            summary: "Tu papel fue bien recibido y ganaste popularidad fuera de la cancha.",
            effects: { reputationDelta: 8, marketValueMultiplier: 1.03 },
          },
          {
            id: "pelicula_distraccion",
            chance: 0.5,
            summary: "El rodaje te quitó más tiempo del previsto y te distrajo de lo deportivo.",
            effects: { statDeltas: { mentality: -1 }, moraleDelta: -3 },
          },
        ],
      },
      {
        key: "rechazar_pelicula",
        label: "Rechazar la propuesta",
        description: "Preferís mantener el foco cien por ciento en el fútbol.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Rechazaste la propuesta para mantener el foco en lo deportivo.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "crisis_institucional",
    category: "FINANZAS",
    title: "Crisis económica en el club",
    description: "El club atraviesa una crisis financiera y le pide al plantel aceptar una rebaja salarial temporal.",
    minAge: 18,
    maxAge: 38,
    weight: 4,
    options: [
      {
        key: "aceptar_rebaja",
        label: "Aceptar la rebaja",
        description: "Ayudás a la institución en un momento difícil.",
        outcomes: [
          {
            id: "rebaja_valorada",
            chance: 1,
            summary: "Tu gesto fue muy valorado por la dirigencia y la hinchada.",
            effects: { reputationDelta: 10, marketValueMultiplier: 0.97 },
          },
        ],
      },
      {
        key: "rechazar_rebaja",
        label: "Rechazar la rebaja",
        description: "Preferís no resignar nada de tu contrato actual.",
        outcomes: [
          {
            id: "rebaja_tension",
            chance: 1,
            summary: "El club respetó tu decisión, aunque quedó cierta tensión con la dirigencia.",
            effects: { moraleDelta: -4 },
          },
        ],
      },
    ],
  },
  {
    key: "mal_arbitraje",
    category: "DISCIPLINA",
    title: "Un arbitraje polémico perjudica a tu equipo",
    description: "Una decisión arbitral muy discutida le costó un partido clave a tu equipo.",
    minAge: 17,
    maxAge: 38,
    weight: 5,
    options: [
      {
        key: "quejarse_publico",
        label: "Quejarte públicamente",
        description: "Denunciás la situación ante los medios.",
        outcomes: [
          {
            id: "apoyo_quejarse",
            chance: 0.45,
            summary: "Tu reclamo generó apoyo y visibilizó el problema arbitral.",
            effects: { reputationDelta: 6, moraleDelta: 3 },
          },
          {
            id: "sancion_quejarse",
            chance: 0.55,
            summary: "La liga te sancionó por tus declaraciones contra el arbitraje.",
            effects: { suspensionMatches: 1, reputationDelta: -5 },
          },
        ],
      },
      {
        key: "aceptar_arbitraje",
        label: "Aceptar la decisión y seguir adelante",
        description: "Preferís no generar más conflicto por algo que ya pasó.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Aceptaste la decisión arbitral y seguiste enfocado en lo que viene.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "beca_estudios",
    category: "PERSONAL",
    title: "Beca para estudiar a distancia",
    description: "Una universidad te ofrece una beca para estudiar una carrera compatible con tu rutina de entrenamientos.",
    minAge: 16,
    maxAge: 30,
    weight: 4,
    options: [
      {
        key: "aceptar_beca",
        label: "Aceptar la beca",
        description: "Sumás una formación extra, aunque te resta tiempo de descanso.",
        outcomes: [
          {
            id: "beca_bien",
            chance: 0.6,
            summary: "Lograste equilibrar los estudios con el fútbol y ganaste una mentalidad más madura.",
            effects: { statDeltas: { mentality: 2 } },
          },
          {
            id: "beca_agota",
            chance: 0.4,
            summary: "La carga de estudiar y entrenar a la vez te dejó agotado.",
            effects: { fitnessDelta: -6, moraleDelta: -3 },
          },
        ],
      },
      {
        key: "rechazar_beca",
        label: "Rechazar la beca por ahora",
        description: "Preferís dedicarte de lleno al fútbol.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Rechazaste la beca para dedicarte de lleno al fútbol.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "oportunidad_suplente",
    category: "ENTRENAMIENTO",
    title: "La lesión de un compañero te abre una oportunidad",
    description: "Un compañero que venía siendo titular se lesionó, y el técnico te da la chance de reemplazarlo.",
    minAge: 16,
    maxAge: 32,
    weight: 6,
    options: [
      {
        key: "aprovechar_oportunidad",
        label: "Aprovechar la oportunidad a fondo",
        description: "Te jugás por dar un salto en tu carrera con más minutos.",
        outcomes: [
          {
            id: "aprovecha_bien",
            chance: 0.6,
            summary: "Aprovechaste el momento y te ganaste un lugar en el equipo titular.",
            effects: { starterShareDelta: 0.15, moraleDelta: 6, reputationDelta: 5 },
          },
          {
            id: "no_aprovecha",
            chance: 0.4,
            summary: "La presión del momento te jugó en contra y no lograste consolidarte.",
            effects: { moraleDelta: -5, starterShareDelta: -0.05 },
          },
        ],
      },
      {
        key: "ir_de_a_poco",
        label: "Tomarlo con calma, de a poco",
        description: "Preferís no forzar la situación de golpe.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Decidiste tomarte el momento con calma, sin apurar nada.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "pretemporada_exigente",
    category: "ENTRENAMIENTO",
    title: "Gira de pretemporada muy exigente",
    description: "El club programó una gira de pretemporada exigente en un clima extremo para llegar a punto a la temporada.",
    minAge: 16,
    maxAge: 36,
    weight: 5,
    options: [
      {
        key: "exigir_al_maximo",
        label: "Exigirte al máximo en cada sesión",
        description: "Buscás llegar a tu mejor nivel físico posible.",
        outcomes: [
          {
            id: "pretemporada_bien",
            chance: 0.55,
            summary: "Llegaste a un nivel físico excelente para el arranque de temporada.",
            effects: { statDeltas: { physical: 3 }, fitnessDelta: 8 },
          },
          {
            id: "pretemporada_mal",
            chance: 0.45,
            summary: "El nivel de exigencia en ese clima te pasó factura físicamente.",
            effects: { fitnessDelta: -12, injuryWeeks: 2 },
          },
        ],
      },
      {
        key: "dosificar_esfuerzo",
        label: "Dosificar el esfuerzo con cuidado",
        description: "Preferís cuidar el cuerpo antes que forzarlo.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Dosificaste el esfuerzo y llegaste a la temporada sin sobresaltos.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "amistoso_seleccion_menor",
    category: "SELECCION",
    title: "Convocatoria a un torneo regional menor",
    description: "La selección te convoca para un torneo regional de menor prestigio, con pocos minutos de televisión.",
    minAge: 18,
    maxAge: 34,
    weight: 4,
    options: [
      {
        key: "responder_torneo_menor",
        label: "Responder al llamado igual",
        description: "Vas con todo aunque el torneo no tenga demasiada repercusión.",
        outcomes: [
          {
            id: "torneo_menor_bien",
            chance: 0.6,
            summary: "Rendiste muy bien y ganaste minutos de rodaje internacional valiosos.",
            effects: { statDeltas: { mentality: 1 }, reputationDelta: 4 },
          },
          {
            id: "torneo_menor_mal",
            chance: 0.4,
            summary: "El desgaste del viaje no se vio compensado por la poca repercusión del torneo.",
            effects: { fitnessDelta: -5, moraleDelta: -2 },
          },
        ],
      },
      {
        key: "priorizar_descanso_club",
        label: "Priorizar el descanso con tu club",
        description: "Tu club prefiere cuidarte de la sobrecarga.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Le diste prioridad al descanso con tu club.", effects: { fitnessDelta: 4 } },
        ],
      },
    ],
  },
  {
    key: "oferta_inversionista",
    category: "FINANZAS",
    title: "Un inversionista quiere comprar parte de tu pase",
    description: "Un fondo de inversión te propone comprar un porcentaje de tu futuro pase a cambio de dinero ahora.",
    minAge: 18,
    maxAge: 34,
    weight: 3,
    options: [
      {
        key: "aceptar_inversion",
        label: "Aceptar el trato",
        description: "Cobrás una suma importante ahora, a cambio de resignar parte de una futura venta.",
        outcomes: [
          {
            id: "inversion_conviene",
            chance: 0.5,
            summary: "El trato resultó conveniente: el dinero extra te dio tranquilidad financiera ya mismo.",
            effects: { marketValueMultiplier: 1.05, moraleDelta: 5 },
          },
          {
            id: "inversion_no_conviene",
            chance: 0.5,
            summary: "Con el diario del lunes, resignaste más de lo que hubiera convenido.",
            effects: { moraleDelta: -4 },
          },
        ],
      },
      {
        key: "rechazar_inversion",
        label: "Rechazar el trato",
        description: "Preferís quedarte con el 100% de tu futuro pase.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Rechazaste el trato para no resignar nada de tu futuro pase.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "fatiga_cronica",
    category: "SALUD",
    title: "Fatiga acumulada",
    description: "Varios partidos seguidos sin descanso te tienen al borde del agotamiento físico y mental.",
    minAge: 17,
    maxAge: 38,
    weight: 5,
    options: [
      {
        key: "pedir_descanso",
        label: "Pedir unos días de descanso",
        description: "Priorizás recuperarte, aunque te puedas perder algún partido.",
        outcomes: [
          {
            id: "descanso_bien",
            chance: 0.8,
            summary: "El descanso te vino perfecto y volviste renovado.",
            effects: { fitnessDelta: 15, moraleDelta: 5 },
          },
          {
            id: "descanso_criticas",
            chance: 0.2,
            summary: "Un sector de la prensa te criticó por pedir descanso en un momento clave.",
            effects: { reputationDelta: -4 },
          },
        ],
      },
      {
        key: "seguir_jugando_fatiga",
        label: "Seguir jugando igual",
        description: "Te aguantás la fatiga con tal de no perderte partidos.",
        outcomes: [
          {
            id: "aguanta_fatiga",
            chance: 0.5,
            summary: "El cuerpo aguantó y no pasó a mayores.",
            effects: { moraleDelta: 3 },
          },
          {
            id: "colapsa_fatiga",
            chance: 0.5,
            summary: "La fatiga acumulada terminó pasándote factura físicamente.",
            effects: { fitnessDelta: -15, injuryWeeks: 4 },
          },
        ],
      },
    ],
  },
  {
    key: "fichaje_penales",
    category: "CLUB",
    title: "Amistoso con ojeadores en la tribuna",
    description:
      "Ojeadores de un club más grande vinieron a verte jugar. El partido se define por penales: meter uno puede ser tu pasaporte a algo mejor.",
    minAge: 16,
    maxAge: 33,
    // weight: 0 — only ever triggered directly from advanceSeason() as an alternative to a
    // regular transfer offer, and only when a genuinely better club is available to jump to.
    weight: 0,
    options: [
      {
        key: "izquierda",
        label: "⬅️ Rematar a la izquierda",
        description: "Buscás el palo izquierdo frente a los ojeadores: si la metés, te vas a un club mejor ya mismo.",
        outcomes: [
          {
            id: "gol",
            chance: 0.5,
            summary: "¡La clavaste en el palo izquierdo con los ojeadores mirando! Un club más grande decide ficharte de inmediato.",
            effects: { reputationDelta: 12, marketValueMultiplier: 1.1, moraleDelta: 10, promotesToBetterClub: true },
          },
          {
            id: "atajada",
            chance: 0.22,
            summary: "El arquero se estiró entero justo frente a los ojeadores. Se enfriaron y no pasó nada más.",
            effects: { moraleDelta: -5 },
          },
          {
            id: "afuera",
            chance: 0.28,
            summary: "La tiraste afuera, por izquierda, con los ojeadores mirando. La oportunidad se esfumó.",
            effects: { moraleDelta: -6 },
          },
        ],
      },
      {
        key: "centro",
        label: "⬆️ Rematar al centro",
        description: "Vas al medio frente a los ojeadores: rara vez se va afuera, pero el arquero puede quedarse parado y atajarla.",
        outcomes: [
          {
            id: "gol",
            chance: 0.4,
            summary: "¡La clavaste al medio con los ojeadores mirando! Un club más grande decide ficharte de inmediato.",
            effects: { reputationDelta: 12, marketValueMultiplier: 1.1, moraleDelta: 10, promotesToBetterClub: true },
          },
          {
            id: "atajada",
            chance: 0.42,
            summary: "El arquero ni se movió y te la atajó justo frente a los ojeadores. Se enfriaron y no pasó nada más.",
            effects: { moraleDelta: -5 },
          },
          {
            id: "afuera",
            chance: 0.18,
            summary: "La tiraste afuera por el medio, con los ojeadores mirando. La oportunidad se esfumó.",
            effects: { moraleDelta: -6 },
          },
        ],
      },
      {
        key: "derecha",
        label: "➡️ Rematar a la derecha",
        description: "Buscás el palo derecho frente a los ojeadores: si la metés, te vas a un club mejor ya mismo.",
        outcomes: [
          {
            id: "gol",
            chance: 0.5,
            summary: "¡La clavaste en el palo derecho con los ojeadores mirando! Un club más grande decide ficharte de inmediato.",
            effects: { reputationDelta: 12, marketValueMultiplier: 1.1, moraleDelta: 10, promotesToBetterClub: true },
          },
          {
            id: "atajada",
            chance: 0.22,
            summary: "El arquero se estiró entero justo frente a los ojeadores. Se enfriaron y no pasó nada más.",
            effects: { moraleDelta: -5 },
          },
          {
            id: "afuera",
            chance: 0.28,
            summary: "La tiraste afuera, por derecha, con los ojeadores mirando. La oportunidad se esfumó.",
            effects: { moraleDelta: -6 },
          },
        ],
      },
      {
        key: "seguro",
        label: "Jugar seguro, sin arriesgar",
        description: "Preferís no exponerte a un fallo público y dejás pasar el momento.",
        outcomes: [
          {
            id: "sin_cambios",
            chance: 1,
            summary: "Jugaste correcto pero sin destacar. Los ojeadores se fueron sin definir nada.",
            effects: { moraleDelta: 1 },
          },
        ],
      },
    ],
  },
  {
    key: "prueba_honestidad",
    category: "DISCIPLINA",
    title: "Prueba de honestidad",
    description:
      "Un individuo de apariencia sombría te ofrece plata para que juegues mal el próximo partido.",
    minAge: 17,
    maxAge: 37,
    weight: 6,
    options: [
      {
        key: "aceptar",
        label: "Aceptar",
        description: "Te llevás un dinero extra, pero arriesgás tu reputación.",
        outcomes: [
          {
            id: "impune",
            chance: 0.45,
            summary: "Nadie se dio cuenta. Cobraste sin consecuencias... por ahora.",
            effects: { marketValueMultiplier: 1.05, moraleDelta: 1, scandalFollowupKey: "escandalo_arreglo_estalla" },
          },
          {
            id: "descubierto",
            chance: 0.55,
            summary: "La liga te investigó y te suspendió varios partidos.",
            effects: { suspensionMatches: 4, reputationDelta: -15, moraleDelta: -10 },
          },
        ],
      },
      {
        key: "rechazar",
        label: "Rechazar",
        description: "No pasa nada, seguís enfocado en lo tuyo.",
        outcomes: [
          {
            id: "nada",
            chance: 1,
            summary: "Rechazaste la oferta y seguiste tu carrera como si nada hubiera pasado.",
            effects: {},
          },
        ],
      },
    ],
  },
  {
    key: "escandalo_arreglo_estalla",
    category: "DISCIPLINA",
    title: "Sale a la luz el partido arreglado",
    description:
      "Un periodista de investigación consiguió pruebas de aquel partido que arreglaste. La noticia ya está en todos lados.",
    minAge: 16,
    maxAge: 41,
    // weight: 0 — only ever forced onto the career a couple of decisions after accepting the
    // bribe in "prueba_honestidad" and getting away with it (see pendingScandalKey).
    weight: 0,
    options: [
      {
        key: "dar_la_cara",
        label: "Dar la cara ante la prensa",
        description: "Ya no hay forma de esconderlo. El club decide cortar por lo sano.",
        outcomes: [
          {
            id: "salida_forzada",
            chance: 1,
            summary: "El escándalo estalló en los medios. El club rescindió tu contrato y tuviste que salir a buscar equipo lejos de las luces.",
            effects: { reputationDelta: -25, moraleDelta: -20, forcesDemotionScandal: true },
          },
        ],
      },
    ],
  },
  {
    key: "oferta_dopaje",
    category: "DISCIPLINA",
    title: "Sustancias para rendir más",
    description:
      "Alguien del entorno del club te ofrece una sustancia prohibida para acelerar tu recuperación y rendir por encima de tu nivel.",
    minAge: 18,
    maxAge: 36,
    weight: 4,
    options: [
      {
        key: "aceptar_dopaje",
        label: "Aceptarla",
        description: "Rendís mejor ya mismo, pero es un secreto que puede explotarte en la cara más adelante.",
        outcomes: [
          {
            id: "rinde",
            chance: 1,
            summary: "Sentiste una mejora notable en tu físico. Nadie sospecha nada... todavía.",
            effects: { statDeltas: { physical: 3, pace: 2 }, scandalFollowupKey: "escandalo_dopaje_estalla" },
          },
        ],
      },
      {
        key: "rechazar_dopaje",
        label: "Rechazarla",
        description: "Preferís no arriesgar tu carrera ni tu salud.",
        outcomes: [
          {
            id: "rechaza_dopaje",
            chance: 1,
            summary: "Rechazaste la sustancia y seguiste entrenando de forma limpia, sin ningún cambio.",
            effects: {},
          },
        ],
      },
    ],
  },
  {
    key: "escandalo_dopaje_estalla",
    category: "DISCIPLINA",
    title: "Estalla un escándalo de dopaje",
    description:
      "Un control antidopaje retroactivo detectó la sustancia que usaste hace un tiempo. La noticia ya es un escándalo internacional.",
    minAge: 16,
    maxAge: 41,
    // weight: 0 — only ever forced onto the career a couple of decisions after accepting the
    // substance in "oferta_dopaje" (see pendingScandalKey).
    weight: 0,
    options: [
      {
        key: "dar_la_cara",
        label: "Dar la cara ante la prensa",
        description: "El club no quiere quedar salpicado por el escándalo y decide desvincularte.",
        outcomes: [
          {
            id: "salida_forzada",
            chance: 1,
            summary: "El escándalo de dopaje explotó en las noticias. El club te desechó para cuidar su imagen y tuviste que salir a reconstruir tu carrera en otro lado.",
            effects: { reputationDelta: -25, moraleDelta: -20, forcesDemotionScandal: true },
          },
        ],
      },
    ],
  },
  {
    key: "plan_alimentacion",
    category: "SALUD",
    title: "Plan de alimentación",
    description:
      "Un nutricionista propone ajustar tu dieta. Puede mejorar tu rendimiento o salir mal.",
    minAge: 16,
    maxAge: 38,
    weight: 8,
    options: [
      {
        key: "seguir_plan",
        label: "Seguir el plan",
        description: "Cambiás tu alimentación por completo.",
        outcomes: [
          {
            id: "mejora",
            chance: 0.6,
            summary: "El cambio de dieta te sentó de maravilla.",
            effects: { statDeltas: { physical: 3, mentality: 1 }, fitnessDelta: 5 },
          },
          {
            id: "mal",
            chance: 0.4,
            summary: "Tu cuerpo no lo toleró bien y bajaste el rendimiento.",
            effects: { statDeltas: { physical: -2 }, fitnessDelta: -5 },
          },
        ],
      },
      {
        key: "mantener",
        label: "Mantener tu dieta",
        description: "Preferís no arriesgar la rutina que ya conocés.",
        outcomes: [
          {
            id: "sin_cambios",
            chance: 1,
            summary: "Seguiste con lo de siempre, sin sobresaltos.",
            effects: {},
          },
        ],
      },
    ],
  },
  {
    key: "concentracion_extra",
    category: "ENTRENAMIENTO",
    title: "Concentración extra",
    description: "Una concentración especial puede potenciarte, pero el esfuerzo también puede pasarte factura.",
    minAge: 16,
    maxAge: 36,
    weight: 8,
    options: [
      {
        key: "hacerla",
        label: "Hacerla",
        description: "Sumás una semana extra de trabajo intensivo.",
        outcomes: [
          {
            id: "sube",
            chance: 0.65,
            summary: "El esfuerzo dio sus frutos y diste un salto de nivel.",
            effects: { statDeltas: { physical: 2, mentality: 2 } },
          },
          {
            id: "sobrecarga",
            chance: 0.35,
            summary: "Te sobrecargaste físicamente y bajó tu rendimiento.",
            effects: { statDeltas: { physical: -3 }, fitnessDelta: -10 },
          },
        ],
      },
      {
        key: "habitual",
        label: "Preparación habitual",
        description: "Seguís con tu plan normal de pretemporada.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Nada cambió en tu preparación.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "entrenamiento_personalizado",
    category: "ENTRENAMIENTO",
    title: "Entrenador personal",
    description: "Un ex jugador reconocido se ofrece a entrenarte de forma personalizada por una temporada.",
    minAge: 17,
    maxAge: 33,
    weight: 6,
    options: [
      {
        key: "contratar",
        label: "Contratarlo",
        description: "Vas a pagar de tu bolsillo, pero podés mejorar rápido.",
        outcomes: [
          {
            id: "clic",
            chance: 0.55,
            summary: "Hiciste buena sintonía y tu técnica dio un salto.",
            effects: { statDeltas: { shooting: 2, passing: 2 }, marketValueMultiplier: 0.98 },
          },
          {
            id: "sin_clic",
            chance: 0.45,
            summary: "No lograste adaptarte a su método y perdiste tiempo valioso.",
            effects: { moraleDelta: -4, marketValueMultiplier: 0.98 },
          },
        ],
      },
      {
        key: "declinar",
        label: "Declinar la oferta",
        description: "Preferís seguir con el cuerpo técnico del club.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Seguiste entrenando con tu equipo de siempre.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "vuelta_a_casa",
    category: "PERSONAL",
    title: "Vuelta a casa",
    description: "Tu familia te pide que vuelvas al país. Extrañan y quieren tenerte cerca.",
    minAge: 20,
    maxAge: 34,
    weight: 5,
    // Only makes sense while actually playing abroad — otherwise "volver al país" is nonsensical.
    requiresAbroad: true,
    options: [
      {
        key: "quedarse",
        label: "Quedarte en el club",
        description: "Priorizás tu carrera, aunque la familia se lo tome mal.",
        outcomes: [
          {
            id: "pelea",
            chance: 1,
            summary: "Te peleaste con tu familia por la decisión. Te costó concentrarte un tiempo.",
            effects: { moraleDelta: -8, statDeltas: { mentality: -2 } },
          },
        ],
      },
      {
        key: "volver",
        label: "Volver al país",
        description: "Buscás un club local para estar cerca de los tuyos.",
        outcomes: [
          {
            id: "vuelta",
            chance: 1,
            summary: "Volviste a jugar cerca de tu familia. Ganaste tranquilidad, aunque el club es más chico.",
            effects: { moraleDelta: 10, marketValueMultiplier: 0.75 },
          },
        ],
      },
    ],
  },
  {
    key: "paternidad",
    category: "PERSONAL",
    title: "Un nuevo integrante en la familia",
    description: "Vas a ser padre o madre. Es una noticia enorme que también cambia tu rutina.",
    minAge: 21,
    maxAge: 35,
    weight: 4,
    options: [
      {
        key: "priorizar_familia",
        label: "Bajar un cambio en lo profesional",
        description: "Te tomás un tiempo para acompañar a tu familia.",
        outcomes: [
          {
            id: "equilibrio",
            chance: 1,
            summary: "Encontraste equilibrio entre la cancha y tu casa. Ganaste paz mental.",
            effects: { moraleDelta: 12, statDeltas: { physical: -1 } },
          },
        ],
      },
      {
        key: "full_carrera",
        label: "Seguir a pleno con tu carrera",
        description: "Delegás lo doméstico para no perder ritmo competitivo.",
        outcomes: [
          {
            id: "rendimiento",
            chance: 0.5,
            summary: "El compromiso extra con lo profesional se notó en la cancha.",
            effects: { statDeltas: { mentality: 2 } },
          },
          {
            id: "desgaste",
            chance: 0.5,
            summary: "La falta de descanso emocional pasó factura.",
            effects: { moraleDelta: -6 },
          },
        ],
      },
    ],
  },
  {
    key: "oferta_patrocinio",
    category: "MEDIA",
    title: "Oferta de patrocinio",
    description: "Una marca deportiva importante te ofrece ser imagen de su próxima campaña.",
    minAge: 18,
    maxAge: 38,
    weight: 6,
    options: [
      {
        key: "firmar",
        label: "Firmar el contrato",
        description: "Sumás ingresos extra y exposición mediática.",
        outcomes: [
          {
            id: "exito",
            chance: 0.7,
            summary: "La campaña fue un éxito y creció tu popularidad.",
            effects: { reputationDelta: 10, marketValueMultiplier: 1.05 },
          },
          {
            id: "polemica",
            chance: 0.3,
            summary: "La campaña generó polémica y te distrajo del funcionamiento del equipo.",
            effects: { moraleDelta: -5, reputationDelta: -3 },
          },
        ],
      },
      {
        key: "rechazar_patrocinio",
        label: "Rechazar la propuesta",
        description: "Preferís mantener bajo perfil.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Seguiste enfocado solo en lo deportivo.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "entrevista_polemica",
    category: "MEDIA",
    title: "Entrevista incómoda",
    description: "Un periodista te hace una pregunta filosa sobre tu técnico en plena conferencia de prensa.",
    minAge: 18,
    maxAge: 38,
    weight: 6,
    options: [
      {
        key: "responder_frontal",
        label: "Responder con total sinceridad",
        description: "Decís lo que pensás, sin filtro.",
        outcomes: [
          {
            id: "aplaudido",
            chance: 0.5,
            summary: "Tu sinceridad fue celebrada por la gente.",
            effects: { reputationDelta: 8, moraleDelta: 4 },
          },
          {
            id: "conflicto",
            chance: 0.5,
            summary: "Tus declaraciones generaron un conflicto interno con el cuerpo técnico.",
            effects: { moraleDelta: -8, reputationDelta: -5 },
          },
        ],
      },
      {
        key: "responder_diplomatico",
        label: "Responder de forma diplomática",
        description: "Evitás polémicas innecesarias.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Esquivaste la polémica sin sobresaltos.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "lesion_muscular",
    category: "SALUD",
    title: "Molestia muscular",
    description: "El cuerpo médico detectó una sobrecarga. Te recomiendan frenar antes de que sea grave.",
    minAge: 16,
    maxAge: 38,
    weight: 7,
    options: [
      {
        key: "parar",
        label: "Parar y tratarte a fondo",
        description: "Te perdés partidos pero reducís el riesgo.",
        outcomes: [
          {
            id: "recuperado",
            chance: 0.85,
            summary: "El descanso funcionó y volviste mejor que antes.",
            effects: { fitnessDelta: 15, injuryWeeks: 3 },
          },
          {
            id: "recaida",
            chance: 0.15,
            summary: "A pesar del cuidado, la lesión se complicó más de lo esperado.",
            effects: { injuryWeeks: 8, statDeltas: { physical: -2 } },
          },
        ],
      },
      {
        key: "jugar_igual",
        label: "Jugar igual, el equipo te necesita",
        description: "Te arriesgás a agravar la lesión con tal de no perderte partidos.",
        outcomes: [
          {
            id: "aguanta",
            chance: 0.4,
            summary: "El cuerpo aguantó y no pasó a mayores.",
            effects: { moraleDelta: 6, fitnessDelta: -5 },
          },
          {
            id: "grave",
            chance: 0.6,
            summary: "La lesión se agravó y te dejó afuera varias semanas.",
            effects: { injuryWeeks: 10, statDeltas: { physical: -4 }, fitnessDelta: -15 },
          },
        ],
      },
    ],
  },
  {
    key: "cirugia_preventiva",
    category: "SALUD",
    title: "Cirugía preventiva",
    description: "Los médicos sugieren operarte una molestia crónica antes de que se vuelva un problema mayor.",
    minAge: 24,
    maxAge: 37,
    weight: 3,
    options: [
      {
        key: "operarse",
        label: "Operarte ahora",
        description: "Es un riesgo, pero podés arrancar de cero físicamente.",
        outcomes: [
          {
            id: "exito_quirurgico",
            chance: 0.75,
            summary: "La cirugía fue un éxito rotundo. Volviste con el cuerpo renovado.",
            effects: { statDeltas: { physical: 4 }, injuryWeeks: 12 },
          },
          {
            id: "complicacion",
            chance: 0.25,
            summary: "Hubo complicaciones en la recuperación.",
            effects: { statDeltas: { physical: -5 }, injuryWeeks: 20 },
          },
        ],
      },
      {
        key: "convivir",
        label: "Convivir con la molestia",
        description: "Preferís no arriesgarte a una recuperación larga.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Seguiste jugando con la molestia bajo control.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "renovacion_contrato",
    category: "FINANZAS",
    title: "Renovación de contrato",
    description: "El club te ofrece renovar. Tu representante cree que podés pedir más.",
    minAge: 20,
    maxAge: 36,
    weight: 6,
    options: [
      {
        key: "presionar",
        label: "Presionar por mejores condiciones",
        description: "Tu agente amenaza con no renovar si no mejoran la oferta.",
        outcomes: [
          {
            id: "logrado",
            chance: 0.55,
            summary: "El club cedió y mejoró sustancialmente tu contrato.",
            effects: { marketValueMultiplier: 1.12, moraleDelta: 8 },
          },
          {
            id: "tension",
            chance: 0.45,
            summary: "La dirigencia se molestó por la presión y quedó tensa la relación.",
            effects: { moraleDelta: -10, reputationDelta: -5 },
          },
        ],
      },
      {
        key: "aceptar_oferta",
        label: "Aceptar la oferta tal cual está",
        description: "Preferís mantener la paz con el club.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Renovaste sin drama, todos conformes.", effects: { moraleDelta: 2 } },
        ],
      },
    ],
  },
  {
    key: "inversion_ahorros",
    category: "FINANZAS",
    title: "Inversión de tus ahorros",
    description: "Un conocido te ofrece meter parte de tus ahorros en un emprendimiento fuera del fútbol.",
    minAge: 22,
    maxAge: 38,
    weight: 4,
    options: [
      {
        key: "invertir",
        label: "Invertir una parte",
        description: "Podés multiplicar tu capital, pero también perderlo.",
        outcomes: [
          {
            id: "gana",
            chance: 0.5,
            summary: "La inversión salió redonda y multiplicaste tu capital.",
            effects: { marketValueMultiplier: 1.03, moraleDelta: 4 },
          },
          {
            id: "pierde",
            chance: 0.5,
            summary: "El emprendimiento fracasó y perdiste buena parte de lo invertido.",
            effects: { moraleDelta: -6 },
          },
        ],
      },
      {
        key: "no_invertir",
        label: "No arriesgar nada",
        description: "Preferís mantener tus ahorros seguros.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Decidiste no arriesgar tus ahorros.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "conflicto_tecnico",
    category: "DISCIPLINA",
    title: "Cruce con el entrenador",
    description: "El técnico te bajó del equipo titular sin avisarte y no te da explicaciones.",
    minAge: 18,
    maxAge: 37,
    weight: 5,
    options: [
      {
        key: "reclamar",
        label: "Reclamarle en la cara",
        description: "Vas directo a pedir explicaciones.",
        outcomes: [
          {
            id: "respeto",
            chance: 0.4,
            summary: "El técnico valoró tu carácter y te devolvió la confianza.",
            effects: { moraleDelta: 10, statDeltas: { mentality: 2 } },
          },
          {
            id: "castigo",
            chance: 0.6,
            summary: "El técnico se ofendió y te marginó del plantel un tiempo.",
            effects: { moraleDelta: -12, suspensionMatches: 2 },
          },
        ],
      },
      {
        key: "trabajar_callado",
        label: "Trabajar en silencio para ganarte el lugar",
        description: "Preferís demostrar en la cancha, sin conflictos.",
        outcomes: [
          {
            id: "recompensa",
            chance: 0.6,
            summary: "Tu profesionalismo fue reconocido con más minutos.",
            effects: { moraleDelta: 6, statDeltas: { mentality: 1 } },
          },
          {
            id: "banco",
            chance: 0.4,
            summary: "Seguiste relegado al banco de suplentes.",
            effects: { moraleDelta: -4 },
          },
        ],
      },
    ],
  },
  {
    key: "escandalo_redes",
    category: "MEDIA",
    title: "Escándalo en redes sociales",
    description: "Un video tuyo de una fiesta privada se filtró y se volvió viral en redes.",
    minAge: 18,
    maxAge: 34,
    weight: 4,
    options: [
      {
        key: "salir_a_aclarar",
        label: "Salir a dar explicaciones públicas",
        description: "Publicás un comunicado propio.",
        outcomes: [
          {
            id: "calma",
            chance: 0.55,
            summary: "Tu explicación calmó las aguas rápidamente.",
            effects: { reputationDelta: 3 },
          },
          {
            id: "empeora",
            chance: 0.45,
            summary: "El comunicado generó más repercusión negativa todavía.",
            effects: { reputationDelta: -12, moraleDelta: -6 },
          },
        ],
      },
      {
        key: "ignorar",
        label: "No decir nada y dejar que pase",
        description: "Confiás en que el tema se apague solo.",
        outcomes: [
          {
            id: "se_apaga",
            chance: 0.65,
            summary: "El tema perdió fuerza en un par de días.",
            effects: { reputationDelta: -2 },
          },
          {
            id: "crece",
            chance: 0.35,
            summary: "El silencio alimentó rumores y la bola de nieve creció.",
            effects: { reputationDelta: -10, moraleDelta: -5 },
          },
        ],
      },
    ],
  },
  {
    key: "convocatoria_juvenil",
    category: "SELECCION",
    title: "Convocatoria a la selección juvenil",
    description: "El entrenador de las juveniles de tu país te sigue de cerca.",
    minAge: 16,
    maxAge: 20,
    weight: 6,
    options: [
      {
        key: "responder_llamado",
        label: "Responder el llamado con todo",
        description: "Le das prioridad absoluta a la citación.",
        outcomes: [
          {
            id: "destacas",
            chance: 0.6,
            summary: "Te destacaste con la juvenil y quedaste en la mira de la absoluta.",
            effects: { reputationDelta: 12, statDeltas: { mentality: 1 } },
          },
          {
            id: "nervios",
            chance: 0.4,
            summary: "Los nervios te jugaron una mala pasada en tu primera convocatoria.",
            effects: { moraleDelta: -4 },
          },
        ],
      },
      {
        key: "priorizar_club",
        label: "Priorizar el descanso con tu club",
        description: "Tu club prefiere cuidarte de la sobrecarga.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Le diste prioridad a tu club esta vez.", effects: { fitnessDelta: 5 } },
        ],
      },
    ],
  },
  {
    key: "presion_hinchada",
    category: "PERSONAL",
    title: "Presión de la hinchada",
    description: "Una mala racha de resultados hizo que parte de la hinchada empiece a putearte en cada partido.",
    minAge: 18,
    maxAge: 37,
    weight: 5,
    options: [
      {
        key: "hacer_oidos_sordos",
        label: "Hacer oídos sordos y enfocarte en lo tuyo",
        description: "Bloqueás el ruido externo.",
        outcomes: [
          {
            id: "supera",
            chance: 0.6,
            summary: "Tu templanza mental te permitió salir adelante.",
            effects: { statDeltas: { mentality: 3 }, moraleDelta: 4 },
          },
          {
            id: "afecta",
            chance: 0.4,
            summary: "La presión te terminó afectando el rendimiento.",
            effects: { moraleDelta: -8, statDeltas: { mentality: -2 } },
          },
        ],
      },
      {
        key: "hablar_con_prensa",
        label: "Responderle a la hinchada en conferencia",
        description: "Decidís confrontar la situación públicamente.",
        outcomes: [
          {
            id: "apoyo",
            chance: 0.45,
            summary: "Tus palabras generaron apoyo de gran parte del plantel y la hinchada.",
            effects: { reputationDelta: 8, moraleDelta: 6 },
          },
          {
            id: "empeora",
            chance: 0.55,
            summary: "Tus declaraciones encendieron todavía más la interna.",
            effects: { reputationDelta: -10, moraleDelta: -8 },
          },
        ],
      },
    ],
  },
  {
    key: "oferta_agente",
    category: "FINANZAS",
    title: "Cambio de representante",
    description: "Un agente de renombre internacional te propone representarte a cambio de una comisión mayor.",
    minAge: 19,
    maxAge: 36,
    weight: 4,
    options: [
      {
        key: "cambiar_agente",
        label: "Cambiar de representante",
        description: "Apostás a su llegada e influencia en el mercado.",
        outcomes: [
          {
            id: "mejores_ofertas",
            chance: 0.55,
            summary: "Sus contactos te abrieron puertas en clubes más grandes.",
            effects: { marketValueMultiplier: 1.08, reputationDelta: 5 },
          },
          {
            id: "decepcion",
            chance: 0.45,
            summary: "No cumplió lo prometido y perdiste tiempo valioso de tu carrera.",
            effects: { moraleDelta: -6, marketValueMultiplier: 0.97 },
          },
        ],
      },
      {
        key: "quedarse_agente",
        label: "Quedarte con tu representante actual",
        description: "Confiás en el vínculo de confianza que ya tenés.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Seguiste con el mismo representante de siempre.", effects: { moraleDelta: 2 } },
        ],
      },
    ],
  },
  {
    key: "capitania",
    category: "PERSONAL",
    title: "Propuesta de capitanía",
    description: "El cuerpo técnico te ofrece la cinta de capitán del equipo.",
    minAge: 23,
    maxAge: 37,
    weight: 4,
    options: [
      {
        key: "aceptar_cinta",
        label: "Aceptar la responsabilidad",
        description: "Asumís el liderazgo del plantel.",
        outcomes: [
          {
            id: "lider_nato",
            chance: 0.65,
            summary: "El grupo respondió de gran manera a tu liderazgo.",
            effects: { statDeltas: { mentality: 3 }, reputationDelta: 8 },
          },
          {
            id: "peso_extra",
            chance: 0.35,
            summary: "La responsabilidad extra te generó más presión de la que esperabas.",
            effects: { moraleDelta: -5 },
          },
        ],
      },
      {
        key: "declinar_cinta",
        label: "Declinar por ahora",
        description: "Preferís enfocarte solo en tu juego.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Preferiste no asumir esa responsabilidad todavía.", effects: {} },
        ],
      },
    ],
  },
  {
    key: "competencia_por_el_puesto",
    category: "DISCIPLINA",
    title: "Competencia por el puesto",
    description: "El club incorporó a otro jugador para competir por tu lugar en el equipo.",
    minAge: 17,
    maxAge: 36,
    weight: 7,
    options: [
      {
        key: "pelear_titularidad",
        label: "Pelear la titularidad a fondo",
        description: "Redoblás el esfuerzo en cada entrenamiento para no ceder tu lugar.",
        outcomes: [
          {
            id: "te_quedas",
            chance: 0.55,
            summary: "Te ganaste la confianza del técnico y consolidaste tu puesto de titular.",
            effects: { starterShareDelta: 0.2, moraleDelta: 6, statDeltas: { mentality: 1 } },
          },
          {
            id: "pierdes_puesto",
            chance: 0.45,
            summary: "El técnico terminó prefiriendo al recién llegado. Pasaste a ser suplente.",
            effects: { starterShareDelta: -0.25, moraleDelta: -8 },
          },
        ],
      },
      {
        key: "aceptar_rotacion",
        label: "Aceptar la rotación con deportividad",
        description: "Preferís no generar conflicto y esperar tu oportunidad.",
        outcomes: [
          {
            id: "rotacion",
            chance: 1,
            summary: "Aceptaste compartir minutos sin generar conflicto en el vestuario.",
            effects: { starterShareDelta: -0.05, moraleDelta: 2 },
          },
        ],
      },
    ],
  },
  {
    key: "oferta_exotica",
    category: "FINANZAS",
    title: "Oferta de una liga exótica",
    description: "Un club de una liga emergente te ofrece un salario altísimo para sumarte a su proyecto.",
    minAge: 27,
    maxAge: 38,
    weight: 3,
    options: [
      {
        key: "tentarse",
        label: "Considerar seriamente la oferta",
        description: "El dinero es tentador, aunque el nivel deportivo sea menor.",
        outcomes: [
          {
            id: "disfruta",
            chance: 0.5,
            summary: "Disfrutaste la experiencia y el buen pasar económico, aunque bajaste tu nivel competitivo.",
            effects: { marketValueMultiplier: 1.2, statDeltas: { mentality: -2 } },
          },
          {
            id: "extrana",
            chance: 0.5,
            summary: "Extrañaste la competencia de alto nivel y te costó adaptarte.",
            effects: { moraleDelta: -8, statDeltas: { mentality: -3 } },
          },
        ],
      },
      {
        key: "rechazar_exotica",
        label: "Rechazar y priorizar el nivel competitivo",
        description: "Preferís seguir compitiendo al más alto nivel posible.",
        outcomes: [
          { id: "sin_cambios", chance: 1, summary: "Rechazaste el dinero fácil por seguir compitiendo arriba.", effects: { reputationDelta: 4 } },
        ],
      },
    ],
  },
];
