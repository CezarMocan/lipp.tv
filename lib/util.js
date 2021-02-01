import { get } from 'dotty';
import imageUrlBuilder from '@sanity/image-url'
import sanity from './sanity'

export const PORTFOLIO_ITEM_LIST_TYPE = 'portfolio-item-list'
export const TEAM_MEMBER_LIST_TYPE = 'team-member-list'
export const TRANSITION_INTERVAL_ENTER = 1000
export const TRANSITION_INTERVAL_EXIT = 600
export const DISTANCE_THRESHOLD = 150;
export const SCROLL_UPDATE_INTERVAL = 100;
export const STACK_SHUFFLE_ANIMATION_TIME = 200;
export const RESIZE_DEBOUNCE_TIME = 1000;
export const THEME_DARK = 'dark';
export const THEME_LIGHT = 'light';
export const TRACKBAR_HEIGHT = 90;
export const MAX_LOAD_TIME = 3000;

const now = () => new Date().getTime();

export const urlFor = (image, width) => {
  if (!image || !image.asset) {
    return ''
  }
  const aspectRatio = aspectRatioForImage(image);
  const builder = imageUrlBuilder(sanity)
  const { windowWidth, windowHeight } = calcDimensions();
  let assetWidth = width ? Math.floor(width * 1.25) : getBucketedWindowWidth();
  return builder.image(image.asset).width(assetWidth).url();
}
