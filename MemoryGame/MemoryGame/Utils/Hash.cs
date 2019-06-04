using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Angular.Controllers.Utils
{
    public class Hash
    {
        /// <summary>
        /// Generate a hash from the given password and salt
        /// </summary>
        /// <param name="password">The password to hash</param>
        /// <param name="salt">Randomly generated salt</param>
        /// <returns></returns>
        public static string GenerateHash(string password, byte[] salt)
        {
            var valueBytes = KeyDerivation.Pbkdf2(
                                password: password,
                                salt: salt,
                                prf: KeyDerivationPrf.HMACSHA512,
                                iterationCount: 10000,
                                numBytesRequested: 256 / 8);

            return Convert.ToBase64String(valueBytes) + "." + Convert.ToBase64String(salt);
        }

        public static string GenerateHash(string password)
        {
            return GenerateHash(password, GenerateSalt());
        }

        public static byte[] GenerateSalt(int length)
        {
            // Divide by 8 to get byte instead of bit
            byte[] salt = new byte[length / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        public static byte[] GenerateSalt()
        {
            //Generate default 128-bit salt
            return GenerateSalt(128);
        }

        public static bool VerifyPassword(string saltedHash, string password)
        {
            var split = saltedHash.Split(".");
            var salt = Convert.FromBase64String(split[1]);
            var newHash = GenerateHash(password, salt);
            return saltedHash == newHash;
        }
    }
}
