import { valueConverter, ValueConverterInstance } from 'aurelia';

@valueConverter({ name: 'formatDate' })
export class FormatDate implements ValueConverterInstance {
    toView(value): string {
        if (!value) {
            return value;
        }

        const usDate = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit',minute: '2-digit', second: '2-digit' });
        return usDate.format(new Date(value));
    }
}