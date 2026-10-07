const schedules = [
    {
        title: 'Boulangerie',
        hours: [
            { days: 'Lundi – samedi', times: '7h – 21h' },
            { days: 'Dimanche', times: '7h – 13h' },
        ],
    },
    {
        title: 'Pizzeria',
        hours: [
            { days: 'Lundi – samedi', times: '11h30 – 14h / 19h – 21h' },
            { days: 'Dimanche', times: '11h30 – 13h / 19h – 21h' },
        ],
    },
];

export default function OpeningHours({ compact = false }: { compact?: boolean }) {
    const Heading = compact ? 'h4' : 'h3';

    return (
        <div className={compact ? 'space-y-5' : 'grid gap-4 md:grid-cols-2'}>
            {schedules.map((schedule) => (
                <div key={schedule.title} className={compact ? '' : 'rounded-lg border border-border/70 bg-muted p-5 sm:p-6'}>
                    <Heading className={compact ? 'text-sm font-semibold text-secondary' : 'text-lg font-semibold text-secondary'}>{schedule.title}</Heading>
                    <dl className={`${compact ? 'mt-2 space-y-2' : 'mt-4 space-y-3'} text-sm leading-6 text-foreground/80`}>
                        {schedule.hours.map(({ days, times }) => (
                            <div key={days} className={compact ? 'flex flex-col sm:flex-row sm:justify-between sm:gap-3' : 'flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4'}>
                                <dt>{days}</dt>
                                <dd className="font-semibold text-primary">{times}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            ))}
        </div>
    );
}
