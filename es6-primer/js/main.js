// Full list of configuration options available at:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,
  transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/none

  // Optional reveal.js plugins
  dependencies: [
    { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
    { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'plugin/highlight/highlight.js', async: true, condition: function() { return !!document.querySelector( 'pre code' ); }, callback: function() { hljs.initHighlightingOnLoad(); } },
    { src: 'plugin/zoom-js/zoom.js', async: true },
    { src: 'plugin/notes/notes.js', async: true }
  ]
});

$('.run').click(function(){
  content = $(this).data('editor').getValue();
  var compiler = new traceur.Compiler;
  compiler.script(content, {experimental: true})
    .then(function(result){
      var source = result.js;
      eval(source);
    });

});

jQuery(function(){
  jQuery('.ace').each(function(i, e){

    var editor = ace.edit(e);
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    $(e).prev().data('editor', editor);
  });
});

//setTimeout(function(){
//  console.clear();
//}, 2000);
