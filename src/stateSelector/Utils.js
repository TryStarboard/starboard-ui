import {merge} from 'ramda'
import {DEFAULT_TAG_COLORS} from '../const/DEFAULT_TAG_COLORS'

export const assignDefaultColorToTag = (tag) => {
  const colors = DEFAULT_TAG_COLORS[tag.text.toLowerCase()]
  if (!colors) {
    return tag
  }
  return merge(tag, {
    background_color: colors.bg,
    foreground_color: colors.fg
  })
}
