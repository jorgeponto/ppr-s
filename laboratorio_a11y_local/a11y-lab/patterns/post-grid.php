<?php
/**
 * Title: Grelha de artigos
 * Slug: a11y-lab/post-grid
 * Categories: posts
 * Inserter: no
 */
?>

<!-- wp:query {"query":{"inherit":true},"layout":{"type":"constrained"}} -->
<div class="wp-block-query">

    <!-- wp:post-template {
        "layout":{
            "type":"grid",
            "columnCount":3,
            "minimumColumnWidth":"12rem"
        }
    } -->

    <!-- wp:pattern {"slug":"a11y-lab/post-card"} /-->

    <!-- /wp:post-template -->

    <!-- wp:query-pagination -->
        <!-- wp:query-pagination-previous /-->
        <!-- wp:query-pagination-numbers /-->
        <!-- wp:query-pagination-next /-->
    <!-- /wp:query-pagination -->

</div>
<!-- /wp:query -->