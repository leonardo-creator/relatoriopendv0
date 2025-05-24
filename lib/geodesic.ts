/**
 * Módulo de substituição para geographiclib-geodesic
 * Este arquivo fornece uma implementação simplificada das funções necessárias
 * sem depender da biblioteca problemática
 */

// Constantes para cálculos geodésicos
const EARTH_RADIUS = 6378137.0 // Raio equatorial da Terra em metros (WGS84)
const FLATTENING = 1 / 298.257223563 // Achatamento da Terra (WGS84)

// Classe substituta para Geodesic
export class Geodesic {
  constructor() {
    // Inicialização simples
  }

  // Método para calcular a distância entre dois pontos
  Inverse(lat1: number, lon1: number, lat2: number, lon2: number) {
    // Implementação simplificada da fórmula de Haversine
    const toRad = (value: number) => (value * Math.PI) / 180

    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = EARTH_RADIUS * c

    // Calcular o azimute (direção)
    const y = Math.sin(dLon) * Math.cos(toRad(lat2))
    const x =
      Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) - Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon)
    let azimuth = (Math.atan2(y, x) * 180) / Math.PI
    if (azimuth < 0) {
      azimuth += 360
    }

    // Retornar um objeto com os resultados
    return {
      s12: distance, // Distância em metros
      azi1: azimuth, // Azimute inicial em graus
      azi2: (azimuth + 180) % 360, // Azimute final em graus
    }
  }

  // Método para calcular um ponto a partir de um ponto inicial, distância e azimute
  Direct(lat1: number, lon1: number, azi1: number, distance: number) {
    // Implementação simplificada
    const toRad = (value: number) => (value * Math.PI) / 180
    const toDeg = (value: number) => (value * 180) / Math.PI

    const lat1Rad = toRad(lat1)
    const lon1Rad = toRad(lon1)
    const azi1Rad = toRad(azi1)
    const angularDistance = distance / EARTH_RADIUS

    const lat2Rad = Math.asin(
      Math.sin(lat1Rad) * Math.cos(angularDistance) + Math.cos(lat1Rad) * Math.sin(angularDistance) * Math.cos(azi1Rad),
    )

    const lon2Rad =
      lon1Rad +
      Math.atan2(
        Math.sin(azi1Rad) * Math.sin(angularDistance) * Math.cos(lat1Rad),
        Math.cos(angularDistance) - Math.sin(lat1Rad) * Math.sin(lat2Rad),
      )

    // Normalizar longitude para -180 a 180
    const lon2 = ((toDeg(lon2Rad) + 540) % 360) - 180

    // Calcular azimute final
    const y = Math.sin(azi1Rad) * Math.sin(angularDistance) * Math.cos(lat1Rad)
    const x = Math.cos(angularDistance) - Math.sin(lat1Rad) * Math.sin(lat2Rad)
    let azi2 = Math.atan2(y, x)
    azi2 = (toDeg(azi2) + 180) % 360

    return {
      lat2: toDeg(lat2Rad),
      lon2: lon2,
      azi2: azi2,
    }
  }
}

// Criar uma instância padrão para uso direto
export const WGS84 = new Geodesic()
