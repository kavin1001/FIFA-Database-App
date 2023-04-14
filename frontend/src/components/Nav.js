export default function Nav() {
  return (
    <nav class="flex items-center justify-between flex-wrap bg-custom-purple p-6">
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <a href="/" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
          Home
        </a>
        <a href="/player-search" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
          Players
        </a>
        <a href="/team-search" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
          Teams
        </a>
        <a href="/matches" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white">
          Matches
        </a>
      </div>
    </div>
  </nav>
  );
}
