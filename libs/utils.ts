import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO Docs https://gist.github.com/takien/4077195
// TODO Docs https://gist.github.com/takien/4077195?permalink_comment_id=3128949#gistcomment-3128949
export function youTubeGetID(url: string) {
  const [a, , b] = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (b !== undefined) {
    return b.split(/[^0-9a-z_-]/i)[0];
  } else {
    return a;
  }
}

// TODO Docs https://github.com/matiassingers/youtube-thumbnail
// default	120 x 90
// mqdefault	320 x 180
// hqdefault	480 x 360
// sddefault	640 x 480
// maxresdefault	Matches the resolution of the uploaded video
// NOTE: May not be available for non-highres videos.
export function youTubeGetCoverImage(
  url: string,
  quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault',
) {
  return `https://img.youtube.com/vi/${url}/${quality}.jpg`;
}
