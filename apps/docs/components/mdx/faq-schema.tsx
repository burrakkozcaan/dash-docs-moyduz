import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';

export function FAQSchema({ faqs }: {
    faqs: { question: string; answer: string }[]
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="my-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <h2 className="text-2xl font-semibold mb-4">Sıkça Sorulan Sorular</h2>
            <Accordions type="multiple">
                {faqs.map((faq, index) => (
                    <Accordion key={index} title={faq.question}>
                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </Accordion>
                ))}
            </Accordions>
        </div>
    );
}
