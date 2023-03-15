import {
  secp256k1,
  decodeFromString,
  encodeToString,
  EncryptedDataSecp256k1,
} from '@polybase/util'

// Public and private key as UInt8Array
// const { publicKey, privateKey } = await secp256k1.generateKeyPair()

export const Uint8Array = (str: string) => decodeFromString(str, 'utf8')

export async function asymmmetricEncryptString(
  publicKey: Uint8Array,
  str: string,
): Promise<EncryptedDataSecp256k1> {
  // Convert string value to UInt8Array so it can be encrypted
  const strDataToBeEncrypted = decodeFromString(str, 'utf8')

  // Encrypt the data (as EncryptedDataAesCbc256)
  const encryptedData = await secp256k1.asymmetricEncrypt(publicKey, strDataToBeEncrypted)

  // Store this data for later access
  return {
    version: encryptedData.version, // secp256k1/asymmetric
    nonce: encryptedData.nonce, // Uint8array
    ciphertext: encryptedData.ciphertext, // Uint8array
    ephemPublicKey: encryptedData.ephemPublicKey, // Uint8array
    mac: encryptedData.mac, // Uint8array
  }
}

export async function asymmetricDecryptString(
  privateKey: Uint8Array,
  encryptedData: EncryptedDataSecp256k1,
): Promise<string> {
  // Encrypt the data (as EncryptedDataSecp256k1)
  const strData = await secp256k1.asymmetricDecrypt(privateKey, encryptedData)

  // Convert back from UInt8Array to string
  const str = encodeToString(strData, 'utf8')

  return str
}
