// @ts-nocheck
import dayjs from 'dayjs'
import * as React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { CalendarTouchableOpacityProps, ICalendarEventBase } from '../interfaces'
import { useTheme } from '../theme/ThemeContext'
import { formatStartEnd } from '../utils/datetime'

interface DefaultCalendarEventRendererProps<T extends ICalendarEventBase> {
  touchableOpacityProps: CalendarTouchableOpacityProps
  event: T
  showTime?: boolean
  textColor: string
  ampm: boolean
}

export function DefaultCalendarEventRenderer<T extends ICalendarEventBase>({
  touchableOpacityProps,
  event,
  showTime = true,
  textColor,
  ampm,
}: DefaultCalendarEventRendererProps<T>) {
  const theme = useTheme()
  const eventTimeStyle = { fontSize: theme.typography.xs.fontSize, color: textColor }
  // const eventTitleStyle = { fontSize: theme.typography.sm.fontSize, color: textColor }

  // for autopilot app clip first title line don't wrap

  const eventTitleStyle = {
    fontSize: theme.typography.sm.fontSize,
    color: textColor,
    ellipsizeMode: 'clip',
    width: '92%',
    height: 18,
  }

  //console.log("event.children", event.children)

  // rendering children has issues when there are JSX variables in them
  // e.g. variables do not get displayed

  return (
    <TouchableOpacity {...touchableOpacityProps}>
      {dayjs(event.end).diff(event.start, 'minute') < 32 && showTime ? (
        <Text style={eventTitleStyle}>
          {event.title},
          <Text style={eventTimeStyle}>
            {dayjs(event.start).format(ampm ? 'hh:mm a' : 'HH:mm')}
          </Text>
        </Text>
      ) : (
        <>
          <Text style={eventTitleStyle}>{event.title}</Text>
          {showTime && (
            <Text style={eventTimeStyle}>
              {formatStartEnd(event.start, event.end, ampm ? 'h:mm a' : 'HH:mm')}
            </Text>
          )}
          {event.children && event.children}
          {event.city && <Text>{event.city}</Text>}
        </>
      )}
    </TouchableOpacity>
  )
}
