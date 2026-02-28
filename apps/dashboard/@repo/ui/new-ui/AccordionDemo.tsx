import {
  RiAccountCircleLine,
  RiMapPinTimeLine,
  RiQuestionLine,
} from '@remixicon/react';

import * as Accordion from '@/components/new-ui/accordion';

export function AccordionDemo() {
  return (
    <div className='w-full max-w-96'>
      <Accordion.Root type='single' collapsible className='space-y-6'>
        <Accordion.Item value='a'>
          <Accordion.Trigger>
            <Accordion.Icon as={RiAccountCircleLine} />
            How do I update my account information?
            <Accordion.Arrow />
          </Accordion.Trigger>
          <Accordion.Content className='px-[30px]'>
            Insert the accordion description here. It would look better as two
            lines of text.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='b'>
          <Accordion.Trigger>
            <Accordion.Icon as={RiQuestionLine} />
            What payment methods are accepted?
            <Accordion.Arrow />
          </Accordion.Trigger>
          <Accordion.Content className='px-[30px]'>
            Major credit and debit cards like Visa, MasterCard, and American
            Express, as well as digital payment options like PayPal and Apple
            Pay.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='c'>
          <Accordion.Trigger>
            <Accordion.Icon as={RiMapPinTimeLine} />
            How can I track my order?
            <Accordion.Arrow />
          </Accordion.Trigger>
          <Accordion.Content className='px-[30px]'>
            Insert the accordion description here. It would look better as two
            lines of text.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}
