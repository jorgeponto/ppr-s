<?php

add_action( 'after_setup_theme', function() {
    add_theme_support( 'align-wide' );
} );


/**
 * Carrega o CSS principal do tema.
 */
function a11y_lab_enqueue_styles() {

    wp_enqueue_style(
        'a11y-lab-style',
        get_stylesheet_uri(),
        array(),
        filemtime( get_stylesheet_directory() . '/style.css' )
    );

    wp_enqueue_script(
        'a11y-lab-theme-toggle',
        get_stylesheet_directory_uri() . '/js/theme-toggle.js',
        array(),
        filemtime(
            get_stylesheet_directory() . '/js/theme-toggle.js'
        ),
        true
    );

    if ( is_page_template( 'page-tutorial' ) ) {

        wp_enqueue_script(
            'a11y-lab-tutorial-nav',
            get_stylesheet_directory_uri() . '/js/tutorial-nav.js',
            array(),
            filemtime(
                get_stylesheet_directory() . '/js/tutorial-nav.js'
            ),
            true
        );

    }

}

add_action( 'wp_enqueue_scripts', 'a11y_lab_enqueue_styles' );


/**
 * Adiciona IDs automáticos aos headings dos tutoriais.
 */
function a11y_lab_add_heading_ids( $block_content, $block ) {

    // Só queremos atuar no template Tutorial.
    if ( ! is_page_template( 'page-tutorial' ) ) {
        return $block_content;
    }

    // Só queremos H2, H3 e H4.
    $level = isset( $block['attrs']['level'] )
        ? (int) $block['attrs']['level']
        : 2;

    if ( $level < 2 || $level > 4 ) {
        return $block_content;
    }

    // Se o heading já tiver uma âncora definida manualmente,
    // não a substituímos.
    if ( ! empty( $block['attrs']['anchor'] ) ) {
        return $block_content;
    }

    // Extrair o texto do heading.
    $text = wp_strip_all_tags( $block_content );

    if ( '' === trim( $text ) ) {
        return $block_content;
    }

    // Transformar o texto num slug.
    $base_id = sanitize_title( $text );

    if ( '' === $base_id ) {
        return $block_content;
    }

    /*
     * IDs já utilizados nesta página.
     *
     * A variável static mantém os IDs enquanto os headings
     * da página estão a ser renderizados.
     */
    static $used_ids = array();

    $id = $base_id;
    $counter = 2;

    // Se o ID já existir, acrescentamos -2, -3, etc.
    while ( isset( $used_ids[ $id ] ) ) {
        $id = $base_id . '-' . $counter;
        $counter++;
    }

    // Registar o ID como utilizado.
    $used_ids[ $id ] = true;

    // Acrescentar o ID ao heading.
    $processor = new WP_HTML_Tag_Processor( $block_content );

    if ( $processor->next_tag() ) {
        $processor->set_attribute( 'id', $id );
        return $processor->get_updated_html();
    }

    return $block_content;
}

add_filter(
    'render_block_core/heading',
    'a11y_lab_add_heading_ids',
    10,
    2
);


/**
 * Gera os links de acesso rápido das secções do tutorial.
 */
function a11y_lab_render_tutorial_toc() {

    // Só funciona no template Tutorial.
    if ( ! is_page_template( 'page-tutorial' ) ) {
        return '';
    }

    $post_id = get_the_ID();

    if ( ! $post_id ) {
        return '';
    }

    $content = get_post_field( 'post_content', $post_id );

    if ( ! $content ) {
        return '';
    }

    $blocks = parse_blocks( $content );

    $items = array();
    $used_ids = array();

    /*
     * Percorrer recursivamente os blocos.
     */
    $process_blocks = function( $blocks ) use ( &$process_blocks, &$items, &$used_ids ) {

        foreach ( $blocks as $block ) {

            // Estamos interessados apenas em headings.
            if ( 'core/heading' === $block['blockName'] ) {

                $level = isset( $block['attrs']['level'] )
                    ? (int) $block['attrs']['level']
                    : 2;

                // Apenas H2, H3 e H4.
                if ( $level >= 2 && $level <= 4 ) {

                    // Texto do heading.
                    $text = wp_strip_all_tags(
                        $block['innerHTML'] ?? '',
                        true
                    );

                    if ( '' !== trim( $text ) ) {

                        /*
                         * Se existir uma âncora definida manualmente,
                         * usamos essa.
                         */
                        if ( ! empty( $block['attrs']['anchor'] ) ) {

                            $id = $block['attrs']['anchor'];

                        } else {

                            /*
                             * Caso contrário, usamos exactamente
                             * a mesma lógica dos headings.
                             */
                            $base_id = sanitize_title( $text );

                            $id = $base_id;
                            $counter = 2;

                            while ( isset( $used_ids[ $id ] ) ) {
                                $id = $base_id . '-' . $counter;
                                $counter++;
                            }
                        }

                        $used_ids[ $id ] = true;

                        $items[] = array(
                            'level' => $level,
                            'text'  => $text,
                            'id'    => $id,
                        );
                    }
                }
            }

            /*
             * Os headings também podem estar dentro de outros
             * blocos (Group, Columns, etc.).
             */
            if ( ! empty( $block['innerBlocks'] ) ) {
                $process_blocks( $block['innerBlocks'] );
            }
        }
    };

    $process_blocks( $blocks );

    // Se não houver headings, não mostramos um índice vazio.
    if ( empty( $items ) ) {
        return '';
    }

    /*
     * Construir a lista HTML hierárquica.
     */
    $html = '<nav class="tutorial-toc" aria-label="Secções da presente página do tutorial">';

    $html .= '<details>';

    $html .= '<summary>Links de acesso rápido</summary>';

    $html .= '<ul>';

    $current_level = 2;

    foreach ( $items as $index => $item ) {

        $level = $item['level'];

        /*
         * Se descemos para um nível mais profundo,
         * abrimos uma nova lista dentro do último <li>.
         */
        if ( $level > $current_level ) {

            for ( $i = $current_level; $i < $level; $i++ ) {
                $html .= '<ul>';
            }

        /*
         * Se subimos de nível, fechamos as listas
         * e os <li> correspondentes.
         */
        } elseif ( $level < $current_level ) {

            for ( $i = $current_level; $i > $level; $i-- ) {
                $html .= '</ul></li>';
            }
        }

        /*
         * Se não é o primeiro item e estamos no mesmo nível,
         * fechamos o <li> anterior.
         */
        if ( 0 !== $index && $level === $current_level ) {
            $html .= '</li>';
        }

        /*
         * Se estamos a mudar de nível para baixo, o novo <li>
         * fica dentro do <li> anterior, portanto não o fechamos.
         */
        if ( $level !== $current_level && $level > $current_level ) {
            // Nada a fechar aqui.
        }

        $html .= sprintf(
            '<li><a href="#%1$s">%2$s</a>',
            esc_attr( $item['id'] ),
            esc_html( $item['text'] )
        );

        $current_level = $level;
    }

    /*
     * Fechar o último item e todas as listas abertas.
     */
    $html .= '</li>';

    while ( $current_level > 2 ) {
        $html .= '</ul></li>';
        $current_level--;
    }

    $html .= '</ul>';
    $html .= '</details>';
    $html .= '</nav>';

    return $html;
}


/**
 * Regista o bloco TOC dos tutoriais.
 */
function a11y_lab_register_tutorial_toc() {

    register_block_type(
        'a11y-lab/tutorial-toc',
        array(
            'render_callback' => 'a11y_lab_render_tutorial_toc',
            'supports'        => array(
                'autoRegister' => true,
                'inserter'     => false,
            ),
        )
    );

}

add_action(
    'init',
    'a11y_lab_register_tutorial_toc'
);


/**
 * Gera a navegação entre páginas de um tutorial.
 */
function a11y_lab_render_tutorial_nav() {

    // Só funciona no template Tutorial.
    if ( ! is_page_template( 'page-tutorial' ) ) {
        return '';
    }

    $current_id = get_the_ID();

    if ( ! $current_id ) {
        return '';
    }

    /*
     * Descobrir os antepassados da página atual.
     *
     * Exemplo:
     *
     * Tutoriais
     *     └── Imagens
     *             └── Imagens Decorativas ← atual
     *
     * get_post_ancestors() devolve:
     * Imagens, Tutoriais
     */
    $ancestors = get_post_ancestors( $current_id );

    if ( empty( $ancestors ) ) {
        return '';
    }

    /*
     * Procurar o tutorial:
     *
     * uma página cujo pai seja a página "Tutoriais".
     */
    $tutorial_id = 0;

    $tutoriais_page = get_page_by_path( 'tutoriais' );

    if ( $tutoriais_page ) {

        foreach ( $ancestors as $ancestor_id ) {

            $ancestor = get_post( $ancestor_id );

            if (
                $ancestor &&
                (int) $ancestor->post_parent === (int) $tutoriais_page->ID
            ) {
                $tutorial_id = $ancestor->ID;
                break;
            }
        }
    }

    /*
     * Se a página atual for o próprio tutorial,
     * usamos a página atual.
     */
    if ( ! $tutorial_id ) {

        if (
            $tutoriais_page &&
            (int) get_post_field( 'post_parent', $current_id ) === (int) $tutoriais_page->ID
        ) {
            $tutorial_id = $current_id;
        }
    }

    if ( ! $tutorial_id ) {
        return '';
    }

    /*
     * Obter todas as páginas descendentes do tutorial.
     */
    $pages = get_pages(
        array(
            'child_of'    => $tutorial_id,
            'post_type'   => 'page',
            'post_status' => 'publish',
            'sort_column' => 'menu_order,post_title',
            'sort_order'  => 'ASC',
        )
    );

    if ( empty( $pages ) ) {
        return '';
    }

    /*
     * Construir uma árvore de páginas.
     */
    $tree = array();

    foreach ( $pages as $page ) {

        $parent = (int) $page->post_parent;

        if ( ! isset( $tree[ $parent ] ) ) {
            $tree[ $parent ] = array();
        }

        $tree[ $parent ][] = $page;
    }

    /*
     * Construir HTML recursivamente.
     */
    $build_list = function( $parent_id ) use ( &$build_list, &$tree, $current_id ) {

        if ( empty( $tree[ $parent_id ] ) ) {
            return '';
        }

        $html = '<ul>';

        foreach ( $tree[ $parent_id ] as $page ) {

            $current = (int) $page->ID === (int) $current_id;

            $html .= '<li>';

            $html .= sprintf(
                '<a href="%1$s"%2$s>%3$s</a>',
                esc_url( get_permalink( $page->ID ) ),
                $current ? ' aria-current="page"' : '',
                esc_html( get_the_title( $page->ID ) )
            );

            $children = $build_list( $page->ID );

            if ( $children ) {
                $html .= $children;
            }

            $html .= '</li>';
        }

        $html .= '</ul>';

        return $html;
    };

    /*
     * O título do tutorial aparece no topo.
     */
    $tutorial_title = get_the_title( $tutorial_id );

    $html = '<nav class="tutorial-nav" aria-label="Páginas do tutorial">';

    $html .= sprintf(
        '<p class="tutorial-nav-title"><a href="%1$s">%2$s</a></p>',
        esc_url( get_permalink( $tutorial_id ) ),
        esc_html( $tutorial_title )
    );

    $html .= $build_list( $tutorial_id );

    $html .= '</nav>';

    return $html;
}


/**
 * Regista o bloco de navegação do tutorial.
 */
function a11y_lab_register_tutorial_nav() {

    register_block_type(
        'a11y-lab/tutorial-nav',
        array(
            'render_callback' => 'a11y_lab_render_tutorial_nav',
            'supports'        => array(
                'autoRegister' => true,
                'inserter'     => false,
            ),
        )
    );

}

add_action(
    'init',
    'a11y_lab_register_tutorial_nav'
);

/**
 * Gera a navegação entre páginas de um tutorial.
 */
function a11y_lab_render_tutorial_pagination() {

    // Só funciona no template Tutorial.
    if ( ! is_page_template( 'page-tutorial' ) ) {
        return '';
    }

    $current_id = get_the_ID();

    if ( ! $current_id ) {
        return '';
    }

    // A página atual tem de ter um pai.
    $parent_id = wp_get_post_parent_id( $current_id );

    if ( ! $parent_id ) {
        return '';
    }

    /*
     * Obter as páginas irmãs, ordenadas pelo campo
     * "Ordem" definido no WordPress.
     */
    $pages = get_pages(
        array(
            'parent'      => $parent_id,
            'post_type'   => 'page',
            'post_status' => 'publish',
            'sort_column' => 'menu_order',
            'sort_order'  => 'ASC',
        )
    );

    if ( empty( $pages ) ) {
        return '';
    }

    // Encontrar a posição da página atual.
    $current_index = null;

    foreach ( $pages as $index => $page ) {
        if ( (int) $page->ID === (int) $current_id ) {
            $current_index = $index;
            break;
        }
    }

    if ( null === $current_index ) {
        return '';
    }

    $previous = $current_index > 0
        ? $pages[ $current_index - 1 ]
        : null;

    $next = $current_index < count( $pages ) - 1
        ? $pages[ $current_index + 1 ]
        : null;

    // Se não houver anterior nem seguinte, não há navegação a apresentar.
    if ( ! $previous && ! $next ) {
        return '';
    }

$html = '<nav class="tutorial-pagination" aria-label="Seletor sequencial de páginas do tutorial">';

$html .= '<ul>';

if ( $previous ) {
    $html .= sprintf(
        '<li class="tutorial-pagination-previous"><a href="%1$s">Página anterior: %2$s</a></li>',
        esc_url( get_permalink( $previous->ID ) ),
        esc_html( get_the_title( $previous->ID ) )
    );
}

if ( $next ) {
    $html .= sprintf(
        '<li class="tutorial-pagination-next"><a href="%1$s">Próxima página: %2$s</a></li>',
        esc_url( get_permalink( $next->ID ) ),
        esc_html( get_the_title( $next->ID ) )
    );
}

$html .= '</ul>';
$html .= '</nav>';

return $html;
}

/**
 * Regista o bloco de navegação entre páginas do tutorial.
 */
function a11y_lab_register_tutorial_pagination() {

    register_block_type(
        'a11y-lab/tutorial-pagination',
        array(
            'render_callback' => 'a11y_lab_render_tutorial_pagination',
            'supports'        => array(
                'autoRegister' => true,
                'inserter'     => false,
            ),
        )
    );

}

add_action(
    'init',
    'a11y_lab_register_tutorial_pagination'
);


/**
 * Gera a apresentação automática de um tutorial.
 */
function a11y_lab_render_tutorial_intro() {

    $tutorial_id = get_the_ID();

    if ( ! $tutorial_id ) {
        return '';
    }

    /*
     * Obter as páginas-filhas do tutorial,
     * pela ordem definida no WordPress.
     */
    $pages = get_pages(
        array(
            'parent'      => $tutorial_id,
            'post_type'   => 'page',
            'post_status' => 'publish',
            'sort_column' => 'menu_order,post_title',
            'sort_order'  => 'ASC',
        )
    );

    if ( empty( $pages ) ) {
        return '';
    }

    /*
     * Primeira página do tutorial.
     */
    $first_page = $pages[0];

    /*
     * Extrair a introdução da primeira página:
     *
     * - ignorar tudo até ao primeiro parágrafo;
     * - incluir esse parágrafo;
     * - incluir todos os blocos seguintes;
     * - parar quando encontrarmos o primeiro heading.
     */
    $blocks = parse_blocks( $first_page->post_content );

    $intro_html = '';
    $started    = false;

    foreach ( $blocks as $block ) {

        /*
         * Ignorar tudo até encontrarmos o primeiro parágrafo.
         */
        if ( ! $started ) {

            if ( 'core/paragraph' !== $block['blockName'] ) {
                continue;
            }

            $started = true;
        }

        /*
         * Quando encontramos o primeiro heading depois
         * de começar a introdução, terminamos.
         */
        if (
            $started
            && 'core/heading' === $block['blockName']
        ) {
            break;
        }

        /*
         * Renderizar o bloco através do WordPress.
         */
        $intro_html .= render_block( $block );
    }

    /*
     * Calcular o número total de palavras
     * de todas as páginas do tutorial.
     */
    $word_count = 0;

    foreach ( $pages as $page ) {

        $content = do_blocks( $page->post_content );
        $text    = wp_strip_all_tags( $content );

        preg_match_all(
            '/[\p{L}\p{N}]+(?:[’\'][\p{L}\p{N}]+)*/u',
            $text,
            $matches
        );

        $word_count += count( $matches[0] );
    }

    /*
     * Estimativa de leitura:
     * ~200 palavras por minuto.
     */
    $reading_time = max(
        1,
        (int) ceil( $word_count / 200 )
    );

    /*
     * Construir o HTML.
     */
    $html = '<div class="tutorial-intro">';

    /*
     * Título da secção.
     */
    $html .= '<h2>O que vai aprender neste tutorial</h2>';

    /*
     * Introdução da primeira página.
     */
    $html .= $intro_html;

/*
 * Separar a introdução da informação sobre o tutorial.
 */
$html .= '<hr>';

$html .= sprintf(
    '<p>Tempo estimado de leitura: %d minutos</p>',
    $reading_time
);

/*
 * Link principal para iniciar o tutorial.
 */
$html .= sprintf(
    '<p class="tutorial-start"><a href="%1$s">Começar o tutorial</a></p>',
    esc_url( get_permalink( $first_page->ID ) )
);

    /*
     * Lista das páginas que compõem o tutorial.
     */
    $html .= '<h2>Conteúdo do tutorial</h2>';

    $html .= '<ul>';

    foreach ( $pages as $page ) {

        $html .= sprintf(
            '<li><a href="%1$s">%2$s</a></li>',
            esc_url( get_permalink( $page->ID ) ),
            esc_html( get_the_title( $page->ID ) )
        );

    }

    $html .= '</ul>';

    $html .= '</div>';

    return $html;
}

/**
 * Regista o bloco de apresentação do tutorial.
 */
function a11y_lab_register_tutorial_intro() {

    register_block_type(
        'a11y-lab/tutorial-intro',
        array(
            'render_callback' => 'a11y_lab_render_tutorial_intro',
            'supports'        => array(
                'autoRegister' => true,
                'inserter'     => false,
            ),
        )
    );

}

add_action(
    'init',
    'a11y_lab_register_tutorial_intro'
);

/**
 * Gera a listagem dos tutoriais disponíveis.
 */
function a11y_lab_render_tutorial_list() {

    $tutoriais_page = get_page_by_path( 'tutoriais' );

    if ( ! $tutoriais_page ) {
        return '';
    }

    /*
     * Obter os tutoriais, ou seja, as páginas-filhas
     * diretas da página "Tutoriais".
     */
    $tutorials = get_pages(
        array(
            'parent'      => $tutoriais_page->ID,
            'post_type'   => 'page',
            'post_status' => 'publish',
            'sort_column' => 'menu_order,post_title',
            'sort_order'  => 'ASC',
        )
    );

    if ( empty( $tutorials ) ) {
        return '';
    }

    /*
     * Construir a lista.
     */
    $html = '<h2>Tutoriais disponíveis</h2>';

    $html .= '<ul>';

    foreach ( $tutorials as $tutorial ) {

        $html .= sprintf(
            '<li><a href="%1$s">%2$s</a></li>',
            esc_url( get_permalink( $tutorial->ID ) ),
            esc_html( get_the_title( $tutorial->ID ) )
        );

    }

    $html .= '</ul>';

    return $html;
}

/**
 * Regista o bloco de listagem dos tutoriais.
 */
function a11y_lab_register_tutorial_list() {

    register_block_type(
        'a11y-lab/tutorial-list',
        array(
            'render_callback' => 'a11y_lab_render_tutorial_list',
            'supports'        => array(
                'autoRegister' => true,
                'inserter'     => false,
            ),
        )
    );

}

add_action(
    'init',
    'a11y_lab_register_tutorial_list'
);

 /*
   * Construir o botão Modo Escuro/Claro.
    */



function a11y_lab_render_theme_toggle() {
    return '
        <button
            type="button"
            class="a11y-lab-theme-toggle"
            aria-pressed="false"
        >
            Modo Escuro
        </button>
    ';
}

function a11y_lab_register_theme_toggle() {
    register_block_type(
        'a11y-lab/theme-toggle',
        array(
            'render_callback' => 'a11y_lab_render_theme_toggle',
            'supports' => array(
                'autoRegister' => true,
                'inserter'    => false,
            ),
        )
    );
}
add_action( 'init', 'a11y_lab_register_theme_toggle' );