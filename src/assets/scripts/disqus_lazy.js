function load_disqus( disqus_shortname ) {
  // Prepare the trigger and target
  var is_disqus_empty = document.getElementById('disqus_empty'),
      disqus_target   = document.getElementById('disqus_thread'),
      disqus_embed    = document.createElement('script'),
      disqus_hook     = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);

  // Load script asynchronously only when the trigger and target exist
  if( disqus_target && is_disqus_empty ) {
    disqus_embed.type = 'text/javascript';
    disqus_embed.async = true;
    disqus_embed.prefetch = true;
    disqus_embed.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
    disqus_hook.appendChild(disqus_embed);
    is_disqus_empty.remove();
  }
}

/*
 * Load disqus only when the document is scrolled till the top of the
 * section where comments are supposed to appear.
 */
window.addEventListener('scroll', function(e) {
  var currentScroll = document.scrollingElement.scrollTop;
  var disqus_target = document.getElementById('disqus_thread');

  if( disqus_target && (currentScroll > disqus_target.getBoundingClientRect().top - 150) ) {
    load_disqus('neverslair');
    return;
    // console.log('Disqus loaded.');
  }
}, false);