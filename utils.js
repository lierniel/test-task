function statement(invoice) {
    const invoiceTable = [];
    let totalAmount = 0;
    let volumeCredits = 0;
    let comedyCount = 0;

    for (let perf of invoice.performance) {
        const amount = getAmount(perf.type, perf.audience);
        invoiceTable.push({
            name: perf.playId,
            amount: amount / 100,
            audience: perf.audience
        })

        // Добавление бонусов
        volumeCredits += Math.max(perf.audience - 30, 0);

        // Дополнительный бонус за каждые 10 комедий
        if (perf.type === 'comedy') {
            if (comedyCount === 10){
                volumeCredits += Math.floor(perf.audience / 5);
                comedyCount = 0;
            } else comedyCount++
        }

        totalAmount += amount;
    }

    return renderInvoice(invoice.customer, invoiceTable, totalAmount/100, volumeCredits);
}


function renderInvoice(customer, invoiceTable, totalAmount, volumeCredits){
    const format = new Intl.NumberFormat('ru-RU',
        { style: 'currency', currency: 'RUB',
            minimumFractionDigits: 2 }).format;
    return `Счет для ${customer}\n` +
        `${invoiceTable.map(row => ` ${row.name}: ${format(row.amount)} (${row.audience} мест)`).join('\n')}\n` +
        `Итого с вас ${format(totalAmount)}\n` +
        `Вы заработали ${volumeCredits} бонусов\n\n`
}

function getAmount(type, audience) {
    switch (type) {
        case 'tragedy':
            return 40000 + 1000 * Math.max(audience - 30, 0);
        case 'comedy':
            return 30000 + 300 * audience + (audience > 20? 10000 + 500 * (audience - 20): 0);
        default:
            throw new Error(`Неизвестный тип: ${type}`);
    }
}

exports.statement = statement;