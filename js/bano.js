function upCarousel(){

    let products = [
        {
            image: '../assets/images/banos/A.jpeg',
            subtitle: null,
            paragraph: null,
        },
        {
            image: '../assets/images/banos/B.jpeg',
            subtitle: null,
            paragraph: null,
        },
        {
            image: '../assets/images/banos/C.jpeg',
            subtitle: null,
            paragraph: null,
        },
        {
            image: '../assets/images/banos/D.jpeg',
            subtitle: null,
            paragraph: null,
        },
        {
            image: '../assets/images/banos/E.jpeg',
            subtitle: null,
            paragraph: null,
        },
        {
            image: '../assets/images/banos/F.jpeg',
            subtitle: null,
            paragraph: null,
        }
    ]

    let eficiency = [
        {
            image: '../assets/images/economico.jpg',
            subtitle: 'Precio más económico',
            paragraph:'Manejamos los mejores precios para la elaboración de espejos, tenemos costos de mayorista para ofrecerte precios competitivos siempre.',
        },
        {
            image: '../assets/images/envio.jpg',
            subtitle: 'Envío a todo Chile',
            paragraph:'Enviamos los espejos a todas las comunas del país, con especial rapidez a las que quedan dentro de la Región Metropolitana.',
        },
        {
            image: '../assets/images/pago.jpg',
            subtitle: 'Todo método de pago',
            paragraph:'Puedes cancelar el valor de tu espejo mediante trasferencia electrónica o con tarjeta de crédito, escoge la opción que prefieras.',
        },
        {
            image: '../assets/images/rapidez.jpg',
            subtitle: 'Rapidez',
            paragraph:'Desarrollamos los espejos a pedido en el menor tiempo posible, en 2 a 3 semanas el espejo que has solicitado estará a tu disposición.',
        },
    ]

    createContent('products', products)
    createContent('eficiency', eficiency)
}