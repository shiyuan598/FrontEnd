export default {
    init (map, coordinates) {
        var el = document.createElement('div')
        el.className = 'marker'

        var el1 = document.createElement('p')
        el.appendChild(el1)
        var el2 = document.createElement('span')
        el1.appendChild(el2)
        var marker = new minemap.Marker(el, {offset: [-10, -10]})
        marker.setLngLat(coordinates)
        marker.addTo(map)
        return marker
    }
}
