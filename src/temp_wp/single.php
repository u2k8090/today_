<?php get_header(); ?>

<main id="   " class="content">
  <section>
    <div class="subpage-header"><p class="title"><?php wp_title(''); ?></p></div>
    <div class="wrapper">
      <section class="entry-wrap">
      <?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
        <article class="entry">
          <header><h1 class="title"><?php the_title(); ?></h1></header>
	  <p class="date"><?php the_time('Y年m月d日'); ?></p>
          <div class="inr"><?php the_content(); ?></div>
        </article>
      <?php endwhile; ?>
      <div class="listback"><a href="/blog/">一覧に戻る</a></div>
      </section>
      <?php get_sidebar(); ?>
    </div>
  </section>
</main>
<?php get_footer(); ?>