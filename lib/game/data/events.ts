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
            effects: { marketValueMultiplier: 1.02, moraleDelta: -2, scandalFollowupKey: "escandalo_arreglo_estalla" },
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
            summary: "Rechazaste la oferta y seguiste tu carrera con la conciencia tranquila.",
            effects: { moraleDelta: 2, reputationDelta: 2 },
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
            summary: "Rechazaste la sustancia y seguiste entrenando de forma limpia.",
            effects: { moraleDelta: 3, reputationDelta: 2 },
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
