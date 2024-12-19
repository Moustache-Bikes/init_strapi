import type { Schema, Attribute } from '@strapi/strapi';

export interface BannerCompleteBannerComponent extends Schema.Component {
  collectionName: 'components_banner_complete_banner_components';
  info: {
    displayName: 'complete_banner_component';
    icon: 'dashboard';
    description: '';
  };
  attributes: {
    logo_emoji: Attribute.Media;
    titre_banner: Attribute.String;
    text_banner: Attribute.Text;
  };
}

export interface BannerCompleteBanner extends Schema.Component {
  collectionName: 'components_banner_complete_banners';
  info: {
    displayName: 'complete_banner';
    icon: 'dashboard';
    description: '';
  };
  attributes: {
    complete_banner: Attribute.Component<'banner.complete-banner-component'>;
    buttons: Attribute.Component<'buttons.button', true>;
    banner_image: Attribute.Media;
  };
}

export interface BannerDoubleImageBanner extends Schema.Component {
  collectionName: 'components_banner_double_image_banners';
  info: {
    displayName: 'double_image_banner';
    icon: 'landscape';
  };
  attributes: {
    double_image: Attribute.Media;
  };
}

export interface BannerSingleImageBanner extends Schema.Component {
  collectionName: 'components_image_single_image_banners';
  info: {
    displayName: 'image_banner';
    icon: 'picture';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
  };
}

export interface ButtonsButton extends Schema.Component {
  collectionName: 'components_buttons_buttons';
  info: {
    displayName: 'button';
    icon: 'cursor';
  };
  attributes: {
    button_link: Attribute.String;
    button_type: Attribute.Enumeration<['Chevron', 'Rounded']>;
    button_text: Attribute.String;
  };
}

export interface ButtonsDropDown extends Schema.Component {
  collectionName: 'components_buttons_drop_downs';
  info: {
    displayName: 'drop-down';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    choices: Attribute.Component<'buttons.dropdown-choises', true>;
  };
}

export interface ButtonsDropdownArticle extends Schema.Component {
  collectionName: 'components_buttons_dropdown_articles';
  info: {
    displayName: 'dropdown-article';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    text_article: Attribute.Blocks;
    image_article: Attribute.Media;
    title_dropdown: Attribute.String;
  };
}

export interface ButtonsDropdownChoises extends Schema.Component {
  collectionName: 'components_buttons_dropdown_choises';
  info: {
    displayName: 'dropdown_choises';
    icon: 'bulletList';
  };
  attributes: {
    choice_text: Attribute.String;
    link: Attribute.String;
  };
}

export interface ButtonsViewMore extends Schema.Component {
  collectionName: 'components_buttons_view_mores';
  info: {
    displayName: 'Boutons';
    icon: 'cursor';
    description: '';
  };
  attributes: {
    Bouton: Attribute.Component<'buttons.button'>;
  };
}

export interface CardActuCards extends Schema.Component {
  collectionName: 'components_card_actu_cards';
  info: {
    displayName: 'actu_cards';
    icon: 'stack';
    description: '';
  };
  attributes: {
    Card: Attribute.Component<'card.cards', true>;
  };
}

export interface CardCards extends Schema.Component {
  collectionName: 'components_card_cards';
  info: {
    displayName: 'Cards';
    icon: 'stack';
    description: '';
  };
  attributes: {
    card_image: Attribute.Media;
    card_title: Attribute.String;
    card_date: Attribute.String;
    card_text: Attribute.Text;
  };
}

export interface ContentContent extends Schema.Component {
  collectionName: 'components_content_contents';
  info: {
    displayName: 'Content';
    icon: 'file';
  };
  attributes: {
    Single_photo: Attribute.Media;
  };
}

export interface ContentDebutAccordeon extends Schema.Component {
  collectionName: 'components_content_debut_accordeons';
  info: {
    displayName: 'D\u00E9but accord\u00E9on';
    icon: 'arrowRight';
  };
  attributes: {
    Titre: Attribute.String;
  };
}

export interface ContentFinAccordeon extends Schema.Component {
  collectionName: 'components_content_fin_accordeon_s';
  info: {
    displayName: 'Fin accord\u00E9on ';
    icon: 'arrowUp';
  };
  attributes: {
    test: Attribute.String;
  };
}

export interface ContentSeparateurHorizontal extends Schema.Component {
  collectionName: 'components_content_separateur_horizontal_s';
  info: {
    displayName: 'S\u00E9parateur_horizontal ';
    icon: 'oneToOne';
  };
  attributes: {
    separator: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface ContenuContenu extends Schema.Component {
  collectionName: 'components_contenu_contenus';
  info: {
    displayName: 'contenu';
  };
  attributes: {
    titre_h2: Attribute.Text;
  };
}

export interface ContenuEmail extends Schema.Component {
  collectionName: 'components_contenu_emails';
  info: {
    displayName: 'email';
    icon: 'archive';
  };
  attributes: {
    email: Attribute.Email;
  };
}

export interface CountryCountryContentAvailable extends Schema.Component {
  collectionName: 'components_country_country_content_availables';
  info: {
    displayName: 'country_content_available';
    icon: 'paperPlane';
    description: '';
  };
  attributes: {
    country: Attribute.String &
      Attribute.Required &
      Attribute.CustomField<'plugin::country-select.country'>;
  };
}

export interface CountryCountry extends Schema.Component {
  collectionName: 'components_country_countries';
  info: {
    displayName: 'Country';
    icon: 'earth';
    description: '';
  };
  attributes: {
    country_picker: Attribute.Component<
      'country.country-content-available',
      true
    > &
      Attribute.Required;
  };
}

export interface FooterFooter extends Schema.Component {
  collectionName: 'components_footer_footers';
  info: {
    displayName: 'Footer';
    icon: 'arrowDown';
  };
  attributes: {
    yes: Attribute.String;
  };
}

export interface HeaderDateParution extends Schema.Component {
  collectionName: 'components_header_date_parutions';
  info: {
    displayName: 'Date_parution';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    Date: Attribute.String;
  };
}

export interface HeaderHeader extends Schema.Component {
  collectionName: 'components_header_headers';
  info: {
    displayName: 'header';
    description: '';
  };
  attributes: {
    Titre1: Attribute.Text & Attribute.Required;
  };
}

export interface HeaderMultipleTags extends Schema.Component {
  collectionName: 'components_header_multiple_tags';
  info: {
    displayName: 'multiple_tags';
    icon: 'priceTag';
    description: '';
  };
  attributes: {
    tag: Attribute.Component<'header.tags', true>;
  };
}

export interface HeaderTags extends Schema.Component {
  collectionName: 'components_header_tags';
  info: {
    displayName: 'tags';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    tag_name: Attribute.Enumeration<
      [
        'News',
        'Deals',
        'Product',
        'Event',
        'Formation',
        'Sport',
        'Urban',
        'Lundi 27',
        'Lundi 20',
        'Mardi 27',
        'Mercredi',
        'Xroad             ',
        'GAME     ',
        'TRAIL',
        'J          ',
        'Dimanche             ',
        'Weekend'
      ]
    > &
      Attribute.Required;
  };
}

export interface ImageCarousel extends Schema.Component {
  collectionName: 'components_image_carousels';
  info: {
    displayName: 'Carousel';
    icon: 'landscape';
  };
  attributes: {
    Carousel: Attribute.Media;
  };
}

export interface ImageSingleImage extends Schema.Component {
  collectionName: 'components_image_single_images';
  info: {
    displayName: 'Single_image';
    icon: 'picture';
  };
  attributes: {
    image: Attribute.Media;
  };
}

export interface ParagrapheText extends Schema.Component {
  collectionName: 'components_paragraphe_texts';
  info: {
    displayName: 'Text';
    icon: 'layer';
    description: '';
  };
  attributes: {
    text_json: Attribute.Blocks;
  };
}

export interface ParametersBrouillon extends Schema.Component {
  collectionName: 'components_parameters_brouillons';
  info: {
    displayName: 'Brouillon';
    icon: 'check';
  };
  attributes: {
    Publier: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface ParametersInternationalization extends Schema.Component {
  collectionName: 'components_parameters_internationalizations';
  info: {
    displayName: 'internationalization';
    icon: 'earth';
    description: '';
  };
  attributes: {
    language_choice: Attribute.Component<'parameters.language-pickers', true> &
      Attribute.Required;
  };
}

export interface ParametersLanguagePickers extends Schema.Component {
  collectionName: 'components_parameters_language_pickers';
  info: {
    displayName: 'language_pickers';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    language: Attribute.Enumeration<
      [
        'Deutsch',
        'English',
        'Espa\u00F1ol',
        'Fran\u00E7ais',
        'Italiano',
        'Nederlands'
      ]
    > &
      Attribute.Required;
  };
}

export interface ParametersLanguage extends Schema.Component {
  collectionName: 'components_parameters_languages';
  info: {
    displayName: 'language';
    icon: 'earth';
  };
  attributes: {
    language: Attribute.String &
      Attribute.CustomField<'plugin::country-select.country'>;
  };
}

export interface ParametersPriority extends Schema.Component {
  collectionName: 'components_parameters_priorities';
  info: {
    displayName: 'priority';
    icon: 'star';
    description: '';
  };
  attributes: {
    Priority: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    priority_placement: Attribute.Enumeration<
      ['un', 'deux', 'trois', 'quatre', 'cinq', 'pas_prio']
    > &
      Attribute.Required;
  };
}

export interface QuoteCitation extends Schema.Component {
  collectionName: 'components_quote_citations';
  info: {
    displayName: 'citation';
    icon: 'quote';
    description: '';
  };
  attributes: {
    Quote: Attribute.Text;
    Author: Attribute.String;
  };
}

export interface QuoteQuote extends Schema.Component {
  collectionName: 'components_quote_quotes';
  info: {
    displayName: 'Quote';
    icon: 'quote';
  };
  attributes: {
    Quote: Attribute.Component<'quote.citation'>;
  };
}

export interface TextImageTextAndImage extends Schema.Component {
  collectionName: 'components_text_image_text_and_images';
  info: {
    displayName: 'Text&Image';
    icon: 'layout';
    description: '';
  };
  attributes: {
    Image: Attribute.Media;
    Text_json: Attribute.Blocks;
    image_placement: Attribute.Enumeration<['Left', 'Right']> &
      Attribute.DefaultTo<'Left'>;
    text_button: Attribute.Component<'buttons.button'>;
  };
}

export interface TitleTitre extends Schema.Component {
  collectionName: 'components_title_titres';
  info: {
    displayName: 'Titre';
    description: '';
  };
  attributes: {
    Titre2: Attribute.Text;
  };
}

export interface VideoVideoComponent extends Schema.Component {
  collectionName: 'components_video_video_components';
  info: {
    displayName: 'video_component';
    icon: 'slideshow';
  };
  attributes: {
    link: Attribute.String;
    from: Attribute.Enumeration<['youtube', 'infomaniak']>;
  };
}

export interface VideoVideoFromLink extends Schema.Component {
  collectionName: 'components_video_video_from_links';
  info: {
    displayName: 'video_from_link';
    icon: 'slideshow';
  };
  attributes: {
    video_from_link: Attribute.Component<'video.video-component'>;
  };
}

export interface VideoVideo extends Schema.Component {
  collectionName: 'components_video_videos';
  info: {
    displayName: 'video';
    icon: 'play';
  };
  attributes: {
    video: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'banner.complete-banner-component': BannerCompleteBannerComponent;
      'banner.complete-banner': BannerCompleteBanner;
      'banner.double-image-banner': BannerDoubleImageBanner;
      'banner.single-image-banner': BannerSingleImageBanner;
      'buttons.button': ButtonsButton;
      'buttons.drop-down': ButtonsDropDown;
      'buttons.dropdown-article': ButtonsDropdownArticle;
      'buttons.dropdown-choises': ButtonsDropdownChoises;
      'buttons.view-more': ButtonsViewMore;
      'card.actu-cards': CardActuCards;
      'card.cards': CardCards;
      'content.content': ContentContent;
      'content.debut-accordeon': ContentDebutAccordeon;
      'content.fin-accordeon': ContentFinAccordeon;
      'content.separateur-horizontal': ContentSeparateurHorizontal;
      'contenu.contenu': ContenuContenu;
      'contenu.email': ContenuEmail;
      'country.country-content-available': CountryCountryContentAvailable;
      'country.country': CountryCountry;
      'footer.footer': FooterFooter;
      'header.date-parution': HeaderDateParution;
      'header.header': HeaderHeader;
      'header.multiple-tags': HeaderMultipleTags;
      'header.tags': HeaderTags;
      'image.carousel': ImageCarousel;
      'image.single-image': ImageSingleImage;
      'paragraphe.text': ParagrapheText;
      'parameters.brouillon': ParametersBrouillon;
      'parameters.internationalization': ParametersInternationalization;
      'parameters.language-pickers': ParametersLanguagePickers;
      'parameters.language': ParametersLanguage;
      'parameters.priority': ParametersPriority;
      'quote.citation': QuoteCitation;
      'quote.quote': QuoteQuote;
      'text-image.text-and-image': TextImageTextAndImage;
      'title.titre': TitleTitre;
      'video.video-component': VideoVideoComponent;
      'video.video-from-link': VideoVideoFromLink;
      'video.video': VideoVideo;
    }
  }
}
