/**
 * Módulo de coordenadas simplificado
 * Implementação sem dependências externas problemáticas
 */

// Função para calcular coordenadas UTM a partir de latitude e longitude
export function calculateUTM(latitude: number | string, longitude: number | string): string {
  if (latitude === "N/A" || longitude === "N/A") {
    return "N/A"
  }

  try {
    const lat = typeof latitude === "string" ? Number.parseFloat(latitude) : latitude
    const lon = typeof longitude === "string" ? Number.parseFloat(longitude) : longitude

    if (isNaN(lat) || isNaN(lon)) {
      return "N/A"
    }

    // Implementação simplificada para calcular UTM
    // Esta é uma aproximação, não tão precisa quanto proj4, mas funcional
    const zone = Math.floor((lon + 180) / 6) + 1

    // Constantes para o elipsoide WGS84
    const a = 6378137.0 // semi-major axis
    const f = 1 / 298.257223563 // flattening
    const k0 = 0.9996 // scale factor

    // Converter para radianos
    const latRad = (lat * Math.PI) / 180
    const lonRad = (lon * Math.PI) / 180

    // Longitude central da zona UTM
    const lonCentralRad = (((zone - 1) * 6 - 180 + 3) * Math.PI) / 180

    // Cálculos para a projeção UTM
    const e = Math.sqrt(2 * f - f * f)
    const n = f / (2 - f)
    const A = (a / (1 + n)) * (1 + (n * n) / 4 + (n * n * n * n) / 64)

    const t = Math.sinh(Math.atanh(Math.sin(latRad)) - e * Math.atanh(e * Math.sin(latRad)))
    const xi = Math.atan(t / Math.cos(lonRad - lonCentralRad))
    const eta = Math.atanh(Math.sin(lonRad - lonCentralRad) / Math.sqrt(1 + t * t))

    // Coeficientes para cálculo de UTM
    const alpha = [
      0,
      (1 / 2) * n - (2 / 3) * n * n + (5 / 16) * n * n * n,
      (13 / 48) * n * n - (3 / 5) * n * n * n,
      (61 / 240) * n * n * n,
    ]

    // Calcular as coordenadas UTM
    const easting =
      500000 +
      k0 *
        A *
        (eta +
          alpha[1] * Math.cos(2 * xi) * Math.sinh(2 * eta) +
          alpha[2] * Math.cos(4 * xi) * Math.sinh(4 * eta) +
          alpha[3] * Math.cos(6 * xi) * Math.sinh(6 * eta))

    let northing =
      k0 *
      A *
      (xi +
        alpha[1] * Math.sin(2 * xi) * Math.cosh(2 * eta) +
        alpha[2] * Math.sin(4 * xi) * Math.cosh(4 * eta) +
        alpha[3] * Math.sin(6 * xi) * Math.cosh(6 * eta))

    // Ajuste para hemisfério sul
    if (lat < 0) {
      northing += 10000000
    }

    return `${easting.toFixed(3)}, ${northing.toFixed(3)}`
  } catch (error) {
    console.error("Erro ao calcular coordenadas UTM:", error)
    return "Erro no cálculo"
  }
}

// Função para calcular a distância entre dois pontos em metros
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3 // Raio da Terra em metros
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // em metros
}
