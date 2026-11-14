# Pracownia Rowerowa Szprycha — Laboratorium 2

Projekt z przedmiotu **Technologie Internetowe: JavaScript, PHP i SVG**. Rozwija Lab 1: zachowuje treść strony, pięć usług i ich ceny, ilustrację roweru, sekcje oraz zieloną kolorystykę. Uporządkowano odstępy, typografię i wygląd kart. Oryginalny katalog Lab 1 nie został zmieniony.

Firma, adres i dane kontaktowe są fikcyjne. Projekt działa bez bibliotek, zewnętrznych zasobów i procesu budowania.

## Pliki

```text
Lab 2/
├── index.html   # samodzielna wersja statyczna
├── index.php    # wersja dynamiczna: cennik, powitanie i wykres
├── style.css    # wspólny wygląd i responsywność
├── app.js       # wspólna obsługa nawigacji
├── assets/
│   └── favicon.svg # ikona karty przeglądarki
└── README.md
```

Ilustracja i logo są zapisane bezpośrednio w dokumentach jako SVG. Katalog `assets` zawiera jedynie wektorową ikonę karty przeglądarki.

## Uruchomienie

**HTML:** otwórz `index.html` w przeglądarce. Strona działa także bez internetu. Opcjonalnie, mając Python, uruchom `python -m http.server 8000` i otwórz `http://localhost:8000/index.html`.

**PHP:** mając PHP w PATH, otwórz terminal w katalogu Lab 2 i uruchom:

```bash
php -S localhost:8000
```

Otwórz **http://localhost:8000/index.php**. Jawna nazwa pliku pozwala odróżnić wersję dynamiczną od statycznego `index.html`. Zatrzymanie serwera: `Ctrl+C`. Nie otwieraj `index.php` bezpośrednio z dysku ani przez serwer Pythona — wymagany jest interpreter PHP.

Na tym komputerze do testów pobrano także przenośny interpreter. Dopóki pozostaje w katalogu tymczasowym, można użyć w PowerShell zamiast instalacji w PATH:

```powershell
& "$env:TEMP\szprycha-php\php.exe" -S localhost:8000
```

W GitHub Codespaces użyj:

```bash
php -S 0.0.0.0:8000
```

Udostępnij port 8000 w panelu **Ports**, otwórz jego adres i dopisz `/index.php`.

**GitHub Pages wykonuje tylko wersję statyczną, nie PHP.** Do publikacji statycznej wystarczą `index.html`, `style.css`, `app.js` i katalog `assets`. Cennik w HTML jest zapisany na stałe; stopka statyczna zawiera rok 2026. Funkcje PHP wymagają osobnego serwera. Nie kopiowano workflow publikującego Lab 1 ani jego konfiguracji zdalnego repozytorium.

## Zrealizowane zadania

1. **Menu mobilne:** przy szerokości poniżej 600 px przycisk Menu rozwija nawigację w układzie strony. JavaScript przełącza `.menu--open` i `aria-expanded`, a `aria-controls` wskazuje menu. Od 600 px nawigacja pozostaje widoczna. Obsługa przez `addEventListener()`, bez atrybutów zdarzeń w HTML. Escape i wybór sekcji zamykają menu; Escape przywraca fokus na przycisku. Zmiana szerokości resetuje stan.
2. **Wersja PHP:** zmienne `$firma` i `$rok = date('Y')` na początku dokumentu; stopka wyświetla je z bezpiecznym kodowaniem tekstu. Obie wersje korzystają z tych samych CSS i JS.
3. **Cennik PHP:** tablica `$cennik` zawiera pięć usług z Lab 1. `foreach` generuje wiersze z nagłówkami usług i cenami w PLN. Funkcja `tekst()` używa `htmlspecialchars()` z `ENT_QUOTES`, `ENT_SUBSTITUTE` i UTF-8. Brak danych daje komunikat zamiast pustej tabeli; niepoprawne wpisy są pomijane.
4. **Logo SVG:** odnośnik do początku treści zawiera oryginalny rower z kół i linii `polyline`, `viewBox="0 0 120 64"`, tytuł oraz nazwę pracowni. Koła mają środki `(28, 42)` i `(92, 42)`, promień 18. Nazwa odnośnika jest podana raz przez `aria-label`. Logo pozostaje wektorowe przy powiększaniu; duża ilustracja dekoracyjna jest pomijana przez czytniki ekranu.

**Bonus A:** `index.php?imie=Ola` wyświetla „Cześć, Ola!”. Brak imienia, pusty tekst lub tablica daje „Cześć, Gościu!”. Dane są kodowane przed wyświetleniem; nieprawidłowe sekwencje UTF-8 są zastępowane bez ostrzeżeń.

**Bonus B:** pod tabelą PHP znajduje się niewielki wykres słupkowy SVG. Korzysta z tego samego `$cennik`; długości pasków są liczone względem najwyższej ceny. Każdy pasek ma tytuł z nazwą usługi i kwotą, a etykiety pozostają zwykłym, responsywnym tekstem. Ceny zerowe i pusty cennik nie powodują dzielenia przez zero.

Zachowano semantyczne sekcje, jeden `h1`, hierarchię nagłówków, podpis tabeli, język polski, odnośnik pomijania nagłówka, widoczny fokus i obsługę preferencji ograniczenia ruchu.

## Jak sprawdzić

- **Menu:** na każdej wersji zmniejsz okno poniżej 600 px. Sprawdź kliknięcie, Tab, Enter, spację i Escape. W narzędziach przeglądarki obserwuj `aria-expanded` i `.menu--open`. Powiększ okno — linki powinny być widoczne.
- **Cennik:** dopisz np. `['nazwa' => 'Wymiana linki', 'cena' => 30],` do `$cennik` i odśwież `/index.php`. Pojawi się dodatkowy wiersz i pasek bez zmiany szablonu. Przywróć tablicę po próbie. Karty opisowe i statyczny HTML zachowują własną treść z Lab 1.
- **Powitanie:** otwórz `/index.php?imie=Ola`, następnie `/index.php?imie[]=Ola` i `/index.php?imie=%3Cscript%3Ealert(1)%3C%2Fscript%3E`. Ostatni adres powinien pokazać kod jako tekst.
- **PHP:** `php -l index.php` sprawdza składnię. W źródle odpowiedzi strony powinny być gotowe HTML i SVG, bez instrukcji PHP. Rok w stopce pochodzi z zegara serwera.

## Wykonana weryfikacja — 14 listopada 2026

- `php -l index.php`: bez błędów; wykonanie sprawdzono przenośnym PHP 8.5.12, pobranym do katalogu tymczasowego z [oficjalnej strony PHP](https://www.php.net/downloads.php?os=windows). Nie zmieniono systemowego PATH.
- W3C Nu HTML Checker: `messages: []` dla HTML i odpowiedzi wyrenderowanej przez PHP.
- Chrome, automatyzacja Playwright: obie wersje przy 1440, 1024, 768, 600, 599, 375 i 320 px; brak poziomego przepełnienia, poprawne lokalne odnośniki i zasoby, brak błędów JavaScript aplikacji. Sprawdzono Enter, spację, Tab, widoczny fokus, Escape, wybór sekcji, `aria-expanded` i zmianę szerokości.
- Sprawdzono skalowanie CSS do 300%, preferencję ograniczenia ruchu oraz zrzuty ekranu wersji desktopowej i mobilnej. Logo i ilustracja zachowują postać wektorową.
- PHP: pięć wierszy i proporcje pasków; dodanie szóstej usługi utworzyło szósty wiersz i pasek. Testy wykonano na kopiach w katalogu tymczasowym.
- PHP: pusty cennik, niepełne i niepoprawne wpisy, ujemna i nieskończona cena, cena zerowa oraz kwota dziesiętna — bez ostrzeżeń i błędów.
- Powitanie: zwykłe imię, brak wartości, białe znaki, tablice, nieprawidłowe UTF-8 oraz kod HTML/JavaScript. Tekst użytkownika nie tworzy elementów HTML i nie wykonuje skryptu. Osobno sprawdzono kodowanie nazwy usługi w tabeli i SVG.
- Potwierdzono dynamiczny rok, poprawne odpowiedzi HTTP dla wspólnych zasobów oraz brak źródła PHP w odpowiedzi.

Nie wykonywano Lighthouse ani pełnego audytu czytnikiem ekranu. PHP nie jest dostępne globalnie; można użyć powyższej ścieżki do wersji przenośnej lub dodać własną instalację do PATH. Narzędzia testowe nie są zależnościami projektu.

## Git

Katalog Lab 2 i jego katalogi nadrzędne nie należą do repozytorium. Repozytorium znajduje się wyłącznie w sąsiednim Lab 1. Zgodnie z poleceniem nie inicjalizowano nowego repozytorium, nie zmieniano Lab 1 i nie utworzono commitów ani publikacji.

Wymagane nazwy commitów to `lab2: menu na telefonie`, `lab2: strona w PHP`, `lab2: cennik z PHP`, `lab2: logo SVG` oraz dodatkowy `lab2: bonusy i dokumentacja`. Wymaganie osobnych commitów pozostaje do zrealizowania w odpowiednim repozytorium Lab 2; wszystkie funkcje są już zaimplementowane.
