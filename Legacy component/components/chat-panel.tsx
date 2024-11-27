import * as React from 'react'

import { shareChat } from '@/Legacy component/app/actions'
import { Button } from '@/Legacy component/components/ui/button'
import { ButtonScrollToBottom } from '@/Legacy component/components/button-scroll-to-bottom'
import { IconShare } from '@/Legacy component/components/ui/icons'
import { FooterText } from '@/Legacy component/components/footer'
import { ChatShareDialog } from '@/Legacy component/components/chat-share-dialog'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useState } from 'react'
import LocationComponent from '../src/components/locationcomponent'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const [exampleMessages, setFeatures] = React.useState<
    { heading: string; subheading: string; message: string }[]
  >([])
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const [weatherData, setWeatherData] = useState(null)

  React.useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const newFeatures = [
          {
            heading: 'Planning for vacation',
            subheading: `${(weatherData as any).name} to Rome next week`,
            message: 'What is the weather forecast in Rome next week?'
          },
          {
            heading: 'Outdoor activities',
            subheading: `in ${(weatherData as any).name} tomorrow`,
            message: `What outdoor activities are suitable in ${
              (weatherData as any).name
            } tomorrow based on the weather forecast?`
          },
          {
            heading: 'Clothing recommendations',
            subheading: `for ${(weatherData as any).name} today`,
            message: `What clothing should I wear in ${
              (weatherData as any).name
            } today based on the weather?`
          },
          {
            heading: 'Health alerts',
            subheading: `for ${(weatherData as any).name} this week`,
            message: `Are there any health alerts in ${
              (weatherData as any).name
            } this week due to the weather conditions?`
          }
        ]

        setFeatures(newFeatures)
      } catch (error) {
        console.error('Error fetching features:', error)
      }
    }

    fetchFeatures()
  }, [weatherData])

  return (
    <div className="fixed inset-x-0 bg-white/90 bottom-0 w-full duration-300 ease-in-out peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] dark:from-10%">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
      <LocationComponent
        onLocationChange={async (lat, lon) => {
          const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
          const data = await response.json()
          setWeatherData(data)
        }}
      />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid sm:grid-cols-2 gap-2 sm:gap-4 px-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={cn(
                  'cursor-pointer bg-zinc-50 text-zinc-950 rounded-2xl p-4 sm:p-6 hover:bg-zinc-100 transition-colors overflow-auto',
                  index > 1 && 'hidden md:block'
                )}
                onClick={async () => {
                  setMessages(currentMessages => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>
                    }
                  ])

                  try {
                    setTimeout(async () => {
                      const responseMessage = {
                        id: nanoid(),
                        display: (
                          <UserMessage>{`The weather forecast for Depok, West Java, Indonesia tomorrow is mostly sunny with a high temperature of 33 degrees Celsius and a low of 26 degrees Celsius. The chance of precipitation is 34%.
                        Given this forecast, here are some outdoor activities that might be suitable:

                        1. Walking or Jogging: The weather is quite warm but not too hot, making it a good day for a walk or jog in the park.
                        2. Picnicking: You could consider having a picnic in a local park. Just make sure to stay hydrated and use sun protection.
                        3. Cycling: If you enjoy biking, this could be a great day to take a ride.
                        4. Photography: The mostly sunny weather could provide excellent natural lighting for outdoor photography.

                        Remember to stay hydrated and protect yourself from the sun. Enjoy your day! 😊`}</UserMessage>
                        )
                      }

                      setMessages(currentMessages => [
                        ...currentMessages,
                        responseMessage
                      ])
                    }, 5000)
                  } catch {
                    toast(
                      <div className="text-red-600">
                        You have reached your recommendations limit! Please try
                        again later.
                      </div>
                    )
                  }
                }}
              >
                <div className="font-medium">{example.heading}</div>
                <div className="text-sm text-zinc-800">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>

        {messages?.length >= 2 ? (
          <div className="flex h-fit items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-2" />
                    Share
                  </Button>
                  <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    shareChat={shareChat}
                    chat={{
                      id,
                      title,
                      messages: aiState.messages
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 sm:pb-4">
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
