(function () {
  const ids = ['brand','heroEyebrow','heroTexto','botaoHero','historiaEyebrow','historiaTitulo','historiaTexto','valoresEyebrow','valoresTitulo','tradicaoTitulo','tradicaoTexto','propositoTitulo','propositoTexto','futuroTitulo','futuroTexto','frase','fraseAutor','contatoEyebrow','contatoTitulo','contatoTexto','botaoContato','rodape'];
  function render(c) {
    ids.forEach(id => { const el = document.getElementById(id); if (el) el.textContent = c[id] || ''; });
    const contact = document.getElementById('botaoContato');
    if (contact) contact.href = 'mailto:' + (c.email || '');
  }
  async function load() {
    render(window.CONTEUDO || {});
    if (!window.supabase || !window.SUPABASE_URL || SUPABASE_URL.includes('COLE_AQUI')) return;
    try {
      const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
      const { data, error } = await client.from('site_content').select('content').eq('id','site').maybeSingle();
      if (!error && data && data.content) render(data.content);
    } catch (e) { console.warn('Conteúdo online indisponível; usando conteúdo local.', e); }
  }
  document.addEventListener('DOMContentLoaded', load);
})();
