<?php get_header(); ?>
<main>
  <div id="index" class="main">
    <section>
      <div class="about">
        <h2 class="about-title">見出し</h2>
        <div class="about-lead">
          <div class="about-lead__title">アバウトリード文のタイトル</div>
          <div class="about-lead__text"><p>アバウトリード文の本文アバウトリード文の本文アバウトリード文の本文アバウトリード文の本文</p></div>
        </div>
        <div class="about-list">
          <div class="about-list__item">
            <div class="title"></div>
            <div class="image"></div>
            <div class="text"></div>
            <div class="btn"></div>
          </div>
          <div class="about-list__item">
            <div class="title"></div>
            <div class="image"></div>
            <div class="text"></div>
            <div class="btn"></div>
          </div>
          <div class="about-list__item">
            <div class="title"></div>
            <div class="image"></div>
            <div class="text"></div>
            <div class="btn"></div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="point">
        <div class="point__inr">
          <h2 class="point-title">見出し</h2>
          <div class="point-text">
            <div class="title"></div>
            <div class="image"></div>
            <div class="text"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
<?php get_footer(); ?>



    <ul>
    <?php
       $newslist = get_posts( array(
      //'category_name' => 'slug', //特定のカテゴリースラッグを指定
      //'tag' => 'slug', //特定のタグスラッグを指定
      //'post_type' => 'slug', //特定のカスタム投稿タイプスラッグを指定
      //'taxonomy' =>'slug', //特定のカスタムタクソノミースラッグを指定
      //'term' =>'slug', //特定のカスタムタクソノミー内のタームスラッグを指定
      //'terms' => array( 'slug1', 'slug2' ), //特定のカスタムタクソノミー内のタームスラッグを複数指定
      /*'tax_query' => array( //複数条件指定
           'relation' => 'AND', //AND（かつ）かOR（または）
             array(
                'taxonomy' => 'color',
                 'field' => 'slug', //スラッグで指定
                 'terms' => 'red'
             ), array(
                 'taxonomy' => 'size',
                 'field' => 'slug',
                 'terms' => 'small'
             )),*/
      /*'meta_query' => array( array( //カスタムフィールド指定
           'key' => 'keyname', //カスタムフィールドのキー名
           'value' => 'value' //そのフィールドに入れられている値名
           )),*/
      //'orderby' => 'modified', //何順で並べるか
      //'order' => 'ASC', //昇順にしたいとき
      'posts_per_page' => 10 //取得記事件数
      ));
        foreach( $newslist as $post ):
        setup_postdata( $post );
    ?>
    <li>
    <?php the_time('Y年n月j日'); ?>
    <a href="<?php the_permalink(); ?>"> <?php the_title(); ?></a>
    </li>
    <?php
      endforeach;
      wp_reset_postdata();
    ?>
    </ul>

<!-- wordpressにログインしているかどうか -->
<?php if ( is_user_logged_in() ) { ?>
aaa
<?php } else { ?>

<?php } ?>

<!-- トップにのみ表示 -->
<?php if(is_front_page()): ?>
    ここはフロントページです！
<?php endif; ?>
