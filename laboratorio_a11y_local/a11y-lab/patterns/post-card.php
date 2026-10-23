<?php
/**
 * Title: Cartão de artigo
 * Slug: a11y-lab/post-card
 * Categories: posts
 * Inserter: no
 */
?>        

        <!-- wp:group {
            "backgroundColor":"light",
            "borderColor":"dark",
            "style":{
                "spacing":{
                    "padding":{
                        "top":"var:preset|spacing|small",
                        "right":"var:preset|spacing|small",
                        "bottom":"var:preset|spacing|small",
                        "left":"var:preset|spacing|small"
                    },
                    "blockGap":"var:preset|spacing|small"
                },
                "border":{
                    "style":"solid",
                    "width":"1px"
                }
            }
        } -->
        <div
            class="wp-block-group has-light-background-color has-background has-border-color has-dark-border-color"
            style="padding-top:var(--wp--preset--spacing--small);padding-right:var(--wp--preset--spacing--small);padding-bottom:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small);border-style:solid;border-width:1px"
        >

            <!-- wp:post-title {
                "isLink":true,
                "fontSize":"large",
                "level":2
            } /-->

            <!-- wp:post-date /-->

            <!-- wp:post-excerpt /-->

            <!-- wp:post-featured-image {
                "isLink":false,
                "aspectRatio":"4/3"
            } /-->

        </div>
        <!-- /wp:group -->