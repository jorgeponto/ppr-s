<?php
/**
 * Title: Últimos artigos
 * Slug: a11y-lab/latest-articles
 * Categories: posts
 */
?>

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

    <!-- wp:heading {"level":2} -->
    <h2>Últimos artigos</h2>
    <!-- /wp:heading -->

    <!-- wp:query {
        "query":{
            "perPage":3,
            "sticky":"ignore",
            "pages":0,
            "offset":0,
            "postType":"post",
            "order":"desc",
            "orderBy":"date",
            "inherit":false
        },
        "layout":{"type":"constrained"}
    } -->
    <div class="wp-block-query">

        <!-- wp:post-template {
            "layout":{
                "type":"grid",
                "columnCount":3,
                "minimumColumnWidth":"12rem"
            }           
        } -->        

            <!-- wp:group {
                    "backgroundColor":"light",
                    "borderColor": "dark",
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
                        "border": {
                            "style": "solid",
                            "width": "1px"                           
                        }
                    }                    
            } -->
            <div class="wp-block-group has-light-background-color has-background has-border-color has-dark-border-color" style="padding-top:var(--wp--preset--spacing--small);padding-right:var(--wp--preset--spacing--small);padding-bottom:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small);border-style:solid;border-width:1px">

                <!-- wp:post-title {
                    "isLink":true,
                    "fontSize":"large",
                    "level":3
                } /-->

                <!-- wp:post-date /-->

                <!-- wp:post-excerpt /-->

                <!-- wp:post-featured-image {
                    "isLink":false,
                    "aspectRatio":"4/3"
                } /-->

            </div>
            <!-- /wp:group -->

        <!-- /wp:post-template -->

    </div>
    <!-- /wp:query -->

</div>
<!-- /wp:group -->