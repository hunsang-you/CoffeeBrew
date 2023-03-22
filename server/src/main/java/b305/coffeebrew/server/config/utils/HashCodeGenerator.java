package b305.coffeebrew.server.config.utils;
import java.util.concurrent.ThreadLocalRandom;

public class HashCodeGenerator {

	public static final int HASH_LENGTH = 5;
	public static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	private static boolean[] usedHashes = new boolean[(int) Math.pow(CHARACTERS.length(), HASH_LENGTH)];

	public static String generate() {
		int index;
		char[] hash;
		do {
			hash = new char[HASH_LENGTH];
			ThreadLocalRandom random = ThreadLocalRandom.current();
			for (int i = 0; i < HASH_LENGTH; i++) {
				index = random.nextInt(CHARACTERS.length());
				hash[i] = CHARACTERS.charAt(index);
			}
		} while (usedHashes[hash.hashCode() % usedHashes.length]);
		usedHashes[hash.hashCode() % usedHashes.length] = true;
		return new String(hash);
	}
}
