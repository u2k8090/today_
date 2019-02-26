<?php get_header(); ?>

<main id="   " class="content">
  <section>
    <div class="subpage-header"><p class="title"><?php wp_title(''); ?></p></div>
    <div class="wrapper">
      <section class="entry-wrap">
      <?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
        <article class="entry">
          <header><h1 class="title"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h1></header>
	  <p class="date"><?php the_time('Y年m月d日'); ?></p>
          <div class="inr"><?php the_content(); ?></div>
        </article>
      <?php endwhile; ?>
      <!-- pagenavi -->
      <div class="tablenav"><?php global $wp_rewrite;
        $paginate_base = get_pagenum_link(1);
        if (strpos($paginate_base, '?') || ! $wp_rewrite->using_permalinks()) {
	  $paginate_format = '';
	  $paginate_base = add_query_arg('paged', '%#%');
        } else {
	  $paginate_format = (substr($paginate_base, -1 ,1) == '/' ? '' : '/') .
	  user_trailingslashit('page/%#%/', 'paged');;
	  $paginate_base .= '%_%';
        }
          echo paginate_links( array(
	    'base' => $paginate_base,
	    'format' => $paginate_format,
	    'total' => $wp_query->max_num_pages,
	    'mid_size' => 5,
	    'current' => ($paged ? $paged : 1),
       )); ?></div>
      <!-- /pagenavi --> 	
      </section>
      <?php get_sidebar(); ?>
    </div>
  </section>
</main>
<?php get_footer(); ?>