(function () {
  const ids = [
    'brand',
    'heroEyebrow',
    'heroTexto',
    'botaoHero',
    'historiaEyebrow',
    'historiaTitulo',
    'historiaTexto',
    'valoresEyebrow',
    'valoresTitulo',
    'tradicaoTitulo',
    'tradicaoTexto',
    'propositoTitulo',
    'propositoTexto',
    'futuroTitulo',
    'futuroTexto',
    'frase',
    'fraseAutor',
    'contatoEyebrow',
    'contatoTitulo',
    'contatoTexto',
    'botaoContato',
    'rodape'
  ];

  function render(c) {
    ids.forEach(function (id) {
      const el = document.getElementById(id);
      if (!el) return;

      let value = c[id];

      // O conteúdo original usa "eyebrow",
      // enquanto o HTML usa "heroEyebrow".
      if (id === 'heroEyebrow' && value == null) {
        value = c.eyebrow;
      }

      // Nunca apagar um texto válido por causa
      // de um campo inexistente no Supabase.
      if (value != null && value !== '') {
        el.textContent = value;
      }
    });

    const contact = document.getElementById('botaoContato');

    if (contact && c.email) {
      contact.href = 'mailto:' + c.email;
    }
  }

  async function load() {

    // Primeiro mostra o conteúdo local.
    const local = window.CONTEUDO || {};
    render(local);

    // Depois tenta buscar a versão online.
    if (
      !window.supabase ||
      !window.SUPABASE_URL ||
      SUPABASE_URL.includes('COLE_AQUI')
    ) {
      return;
    }

    try {
      const client = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
      );

      const { data, error } = await client
        .from('site_content')
        .select('content')
        .eq('id', 'site')
        .maybeSingle();

      if (error) {
        console.warn('Erro ao carregar conteúdo online:', error);
        return;
      }

      if (data && data.content) {

        // Junta o conteúdo local com o conteúdo online.
        // Assim, campos ausentes no banco não desaparecem.
        const online = data.content;

        const combinado = {
          ...local,
          ...online
        };

        render(combinado);
      }

    } catch (e) {
      console.warn(
        'Conteúdo online indisponível; usando conteúdo local.',
        e
      );
    }
  }

  document.addEventListener('DOMContentLoaded', load);

})();
