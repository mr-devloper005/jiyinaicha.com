import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  { title: 'Getting started', description: 'Create your account and post your first classified ad in minutes.' },
  { title: 'Categories & search', description: 'Use filters and search to find vehicles, homes, phones, and more nearby.' },
  { title: 'Staying safe', description: 'Meet locally when you can, verify details, and report suspicious listings.' },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Help for buying and selling on our classifieds marketplace."
      actions={
        <Button asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <Card key={topic.title} className="border-border bg-card transition-transform hover:-translate-y-1">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground">{topic.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground">FAQ</h3>
            <Accordion type="single" collapsible className="mt-4">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
